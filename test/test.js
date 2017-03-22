function test(event) {
  var root = document.body;
  var taxa =  [
    'Arachis duranensis',
    'Arachis hypogaea',
    'Arachis ipaensis',
    'Apios americana',
    'Cajanus cajan',
    'Chamaecrista fasciculata',
    'Cicer arietinum',
    'Glycine max',
    'Lens culinaris',
    'Lotus japonicus',
    'Lupinus angustifolius',
    'Medicago sativa',
    'Medicago truncatula',
    'Phaseolus vulgaris',
    'Pisum sativum',
    'Trifolium pratense',
    'Trifolium repen',
    'Vicia faba',
    'Vigna angularis',
    'Vigna radiata',
    'Vigna unguiculata'
  ];
  var components = taxa.map(function(taxon) {
    return {
      view: function() {
        var color = taxonChroma.get(taxon, { lightnessFactor: 1.2 });
        return m('div', {  style: 'background-color:' + color }, taxon);
      }
    }
  });
  m.render(root, m('div', components.map(m)));
}

document.addEventListener('DOMContentLoaded', test);
