/*
 * use the chroma.js library to colorize taxons consistently and predictably.
 * e.g. Always returns same hue for Arachis, but scaled lightness depending on
 * the Species -- completely abitrarily, but consistently.
 *
 * taxonChroma.get(taxon, options);
 *
 * // examples:
 * taxonChroma.get('Arachis hypogaea');
 * taxonChroma.get('Arachis burkartii');
 *
 * // make 20% lighter overall
 * taxonChroma.get(someTaxon, { lightnessFactor: 1.2 } );
 *
 * // override some taxon
 * taxonChroma.get(acc.properties.taxon, {
 *  'lightnessFactor' : 1.2,
 *  'overrides' : {
 *   'phaseolus lunatus' : 'green',
 *  }
 * });
 */

import * as chroma from 'chroma.ts';

export type ColorMap = {[key: string]: string | number};

// New colors 15 degrees apart in hue space, to reduce conflicts
const baseColors: ColorMap = {
  acacia: '#ffc000',
  aeschynomene: '#ff4000',
  apios: '#00c0ff',
  arachis: '#ff8000',
  bauhinia: '#ff00c0',
  cajanus: '#0040ff',
  cercis: '#ff0040',
  chamaecrista: '#ffff00',
  cicer: '#80ff00',
  dalbergia: '#ff0000',
  glycine: '#4000ff',
  lablab: '#8000ff',
  lens: '#00ff80',
  lotus: '#00ffff',
  lupinus: '#c000ff',
  medicago: '#40ff00',
  phanera: '#ff0080',
  phaseolus: '#0000ff',
  pisum: '#00ff00',
  quillaja: '#666666', // not a legume, but related
  senna: '#c0ff00',
  sindora: '#ff00ff',
  trifolium: '#00ff40',
  vicia: '#00ffc0',
  vigna: '#0080ff',
};

export const genera = Object.keys(baseColors);

export type GetOptions = {
  lightnessFactor?: number;
  overrides?: ColorMap;
};

/**
 * a consistent hashing algorithm
 * https://gist.github.com/vaiorabbit/5657561
 * http://isthe.com/chongo/tech/comp/fnv/#xor-fold
 **/
function fnv32a(str: string, hashSize: number): number {
  const FNV1_32A_INIT = 0x811c9dc5;
  let hval = FNV1_32A_INIT;
  for (let i = 0; i < str.length; ++i) {
    hval ^= str.charCodeAt(i);
    hval +=
      (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
  }
  return (hval >>> 0) % hashSize;
}

export class TaxonChroma {
  // default lightness factor (1= don't post-adjust)
  static readonly LIGHTNESS_FACTOR = 1;
  static readonly MIN_LIGHTNESS = 0.3;

  readonly defaultColor: string; // used for non-legume genera
  private colorCache: ColorMap = {};

  constructor(defaultColor: string = '#d3d3d3') {
    this.defaultColor = defaultColor;
  }

  public get(taxon: string, options: GetOptions = {}): string | number {
    if (taxon.indexOf(' ') === -1) {
      throw 'Error: required format is "genus species" with a space between';
    }
    taxon = taxon.toLowerCase();

    // options is an object w/ keys lightnessFactor, overrides
    const {lightnessFactor = TaxonChroma.LIGHTNESS_FACTOR, overrides = {}} =
      options;

    // convert overrides to lowercase
    const lowerOverrides: ColorMap = Object.fromEntries(
      Object.entries(overrides).map(([k, v]) => [k.toLowerCase(), v]),
    );

    // return override color
    if (lowerOverrides[taxon] !== undefined) {
      return lowerOverrides[taxon];
    }

    // return cached color
    if (this.colorCache[taxon] !== undefined) {
      return this.colorCache[taxon];
    }

    // compute color
    let color = this.defaultColor;
    const [genus, species, ..._] = taxon.split(' ');

    if (genus in baseColors) {
      const genusColor = baseColors[genus];
      const [hue, ..._] = chroma.color(genusColor).hsl();
      const lightness =
        TaxonChroma.MIN_LIGHTNESS +
        (fnv32a(species, 1000) / 1000) * (1 - 2 * TaxonChroma.MIN_LIGHTNESS);
      color = chroma.color(hue, 1, lightness * lightnessFactor, 'hsl').hex();
    }
    this.colorCache[taxon] = color;

    return color;
  }
}

export const taxonChroma = new TaxonChroma();
