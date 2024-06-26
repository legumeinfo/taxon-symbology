import {genera, taxonChroma, TaxonChroma} from '../src/index';

test('supported genera', () => {
  expect(genera).toEqual([
    'acacia',
    'aeschynomene',
    'apios',
    'arachis',
    'bauhinia',
    'cajanus',
    'cercis',
    'chamaecrista',
    'cicer',
    'dalbergia',
    'glycine',
    'lablab',
    'lens',
    'lotus',
    'lupinus',
    'medicago',
    'phanera',
    'phaseolus',
    'pisum',
    'quillaja',
    'senna',
    'sindora',
    'trifolium',
    'vicia',
    'vigna',
  ]);
});

test('singleton default color', () => {
  expect(taxonChroma.defaultColor).toBe('#d3d3d3');
});

test('instantiated default color', () => {
  const tc = new TaxonChroma();
  expect(tc.defaultColor).toBe('#d3d3d3');
});

test('override default color', () => {
  const overrideDefault = '#000000';
  const tc = new TaxonChroma(overrideDefault);
  expect(tc.defaultColor).toBe(overrideDefault);
});

test('no space', () => {
  expect(() => taxonChroma.get('dummy')).toThrow();
});

test('multi space', () => {
  expect(taxonChroma.get('Apios americana')).toBe(
    taxonChroma.get('Apios americana groundnut'),
  );
});

test('case insensitive', () => {
  expect(taxonChroma.get('apios americana')).toBe(
    taxonChroma.get('APIOS AMERICANA'),
  );
});

test('get options: lightness factor', () => {
  const genera = 'Apios americana';
  const tc = new TaxonChroma();
  const options = {lightnessFactor: 0.5};
  expect(taxonChroma.get(genera)).not.toBe(tc.get(genera, options));
});

test('get options: overrides', () => {
  const genera = 'Apios americana';
  const overrideColor = '#000000';
  const options = {overrides: {'Apios americana': overrideColor}};
  expect(taxonChroma.get(genera, options)).toBe(overrideColor);
});

test('get options: case insensitive overrides', () => {
  const genera = 'Apios americana';
  const overrideColor = '#000000';
  const options = {
    overrides: {
      'apios americana': '#FFFFFF',
      'APIOS AMERICANA': overrideColor,
    },
  };
  expect(taxonChroma.get(genera, options)).toBe(overrideColor);
});

test('base colors', () => {
  const taxa = [
    'Acacia crassicarpa',
    'Aeschynomene evenia',
    'Apios americana',
    'Arachis duranensis',
    'Arachis hypogaea',
    'Arachis ipaensis',
    'Bauhinia variegata',
    'Cajanus cajan',
    'Cercis canadensis',
    'Chamaecrista fasciculata',
    'Cicer arietinum',
    'Dalbergia odorifera',
    'Glycine max',
    'Glycine soja',
    'Lablab purpureus',
    'Lens culinaris',
    'Lotus japonicus',
    'Lupinus albus',
    'Lupinus angustifolius',
    'Medicago sativa',
    'Medicago truncatula',
    'Phanera championii',
    'Phaseolus lunatus',
    'Phaseolus vulgaris',
    'Pisum sativum',
    'Quillaja saponaria',
    'Senna tora',
    'Sindora glabra',
    'Trifolium pratense',
    'Trifolium repens',
    'Vicia faba',
    'Vigna angularis',
    'Vigna radiata',
    'Vigna unguiculata',
  ];
  expect(taxa.map((t) => taxonChroma.get(t))).not.toContain(
    taxonChroma.defaultColor,
  );
});

test('not base color', () => {
  expect(taxonChroma.get('Homo sapien')).toBe(taxonChroma.defaultColor);
});

test('cache', () => {
  const genera = 'Apios americana';
  taxonChroma.get(genera);
  // brackets to avoid private access error
  expect(genera.toLowerCase() in taxonChroma['colorCache']).toBe(true);
});
