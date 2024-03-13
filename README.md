# `@legumeinfo/taxon-symbology`

A TypeScript library for consistent coloring of visualizations by genus &amp; species.

## Installation

```console
npm i @legumeinfo/taxon-symbology
```

## Usage

To use the library, import the `taxonChroma` object.
When using the library in a webpage, import from the bundled script:
```html
<script type="module">
    import { taxonChroma } from 'node_modules/@legumeinfo/taxon-symbology/dist/taxon-symbology.min.js';
</script>
```
When using the library in a TypeScript/JavaScript project, import from the module:
```typescript
import { taxonChroma } from '@legumeinfo/taxon-symbology';
```

Use the library as follows:
```typescript
// returns css color specification in rgb
taxonChroma.get(taxon, options);

// examples:
taxonChroma.get('Arachis hypogaea'); // returns "rgb(254, 255, 32)"
taxonChroma.get('Arachis burkartii'); // etc.

// make 20% lighter overall
taxonChroma.get(someTaxon, { lightnessFactor: 1.2 } );

// override some taxon
taxonChroma.get(myTaxonVar, {
  'overrides' : {
    'phaseolus lunatus' : 'green',
  }
});
```
Note that the library is case-insensitive, meaning that `taxonChroma.get('Arachis hypogaea')` and `taxonChroma.get('ARACHIS HYPOGAEA')` will return the same result.
Similarly, if the `overrides` has multiple entries for the same taxon (i.e. different capitalizations), then the last one will be used.
