# lis-taxon-symbology
Javascript library for consistent coloring of visualizations by genus &amp; species.

## Usage

```
taxonChroma.get(taxon, options); // returns css color specification in rgb

// examples:
taxonChroma.get('Arachis hypogaea'); // returns "rgb(254, 255, 32)"
taxonChroma.get('Arachis burkartii'); // etc.

// make 20% lighter overall
taxonChroma.get(someTaxon, { lightnessFactor: 1.2 } );

// override some taxon. this is mainly useful to take advantage of the color
// caching.
taxonChroma.get(myTaxonVar, {
 'overrides' : {
  'phaseolus lunatus' : 'green',
 }
});
```
