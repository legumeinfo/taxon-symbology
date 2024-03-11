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

import * as chroma from "chroma.ts";

const moreBrewerColors = chroma.brewer.Set2;

// some of these colors are carried over from the colors.json file
// from the pholylotree module. they are all cbrewer classification
// colors.
const baseColors: { [key: string]: string|number } = {
  apios: moreBrewerColors[0],
  arachis: '#bcbd22',
  cajanus: '#ffbb78',
  chamaecrista: moreBrewerColors[5],
  cicer: '#2ca02c',
  glycine: '#1f77b4',
  lens: '#98df8a',
  lotus: '#17becf',
  lupinus: '#ff9896',
  medicago: '#8c564b',
  phaseolus: '#e377c2',
  pisum: '#f7b6d2',
  trifolium: moreBrewerColors[2],
  vicia: moreBrewerColors[4],
  vigna: '#d62728',
};

export const genera = Object.keys(baseColors);

export type GetOptions = {
  lightnessFactor?: number;
  overrides?: { [key: string]: string };
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
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
  }
  return (hval >>> 0) % hashSize;
}

export class TaxonChroma {

  // default lightness factor (1= don't post-adjust)
  static readonly LIGHTNESS_FACTOR = 1;
  static readonly MIN_LIGHTNESS = 0.3;

  defaultColor: string;  // used for non-legume genera
  colorCache: { [key: string]: string } = {};

  constructor(defaultColor: string = '#d3d3d3') {
    this.defaultColor = defaultColor;
  }

  public get(taxon: string, options: GetOptions = {}): string {
    if (taxon.indexOf(' ') === -1) {
      throw 'Error: required format is "genus species" with a space between';
    }
    taxon = taxon.toLowerCase();

    // options is an object w/ keys lightnessFactor, overrides
    const {
      lightnessFactor = TaxonChroma.LIGHTNESS_FACTOR,
      overrides = {}
    } = options;

    // return override color
    if (overrides[taxon] !== undefined) {
      return overrides[taxon];
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
  };

};

export const taxonChroma = new TaxonChroma();
