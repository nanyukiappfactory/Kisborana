S2.define('select2/selection/single',[
  'jquery',
  './base',
  '../utils',
  '../keys'
], function ($, BaseSelection, Utils, KEYS) {
  function SingleSelection () {
    SingleSelection.__super__.constructor.apply(this, arguments);
  }

  Utils.Extend(SingleSelection, BaseSelection);

  SingleSelection.prototype.render = function () {
    var $selection = SingleSelection.__super__.render.call(this);

    $selection.addClass('select2-selection--single');

    $selection.html(
      '<span class="select2-selection__rendered"></span>' +
      '<span class="select2-selection__arrow" role="presentation">' +
        '<b role="presentation"></b>' +
      '</span>'
    );

    return $selection;
  };

  SingleSelection.prototype.bind = function (container, $container) {
    var self = this;

    SingleSelection.__super__.bind.apply(this, arguments);

    var id = container.id + '-container';

    this.$selection.find('.select2-selection__rendered')
      .attr('id', id)
      .attr('role', 'textbox')
      .attr('aria-readonly', 'true');
    this.$selection.attr('aria-labelledby', id);

    this.$selection.on('mousedown', function (evt) {
      // Only respond to left clicks
      if (evt.which !== 1) {
        return;
      }

      self.trigger('toggle', {
        originalEvent: evt
      });
    });

    this.$selection.on('focus', function (evt) {
      // User focuses on the container
    });

    this.$selection.on('blur', function (evt) {
      // User exits the container
    });

    container.on('focus', function (evt) {
      if (!container.isOpen()) {
        self.$selection.focus();
      }
    });
  };

  SingleSelection.prototype.clear = function () {
    var $rendered = this.$selection.find('.select2-selection__rendered');
    $rendered.empty();
    $rendered.removeAttr('title'); // clear tooltip on empty
  };

  SingleSelection.prototype.display = function (data, container) {
    var template = this.options.get('templateSelection');
    var escapeMarkup = this.options.get('escapeMarkup');

    return escapeMarkup(template(data, container));
  };

  SingleSelection.prototype.selectionContainer = function () {
    return $('<span></span>');
  };

  SingleSelection.prototype.update = function (data) {
    if (data.length === 0) {
      this.clear();
      return;
    }

    var selection = data[0];

    var $rendered = this.$selection.find('.select2-selection__rendered');
    var formatted = this.display(selection, $rendered);

    $rendered.empty().append(formatted);
    $rendered.attr('title', selection.title || selection.text);
  };

  return SingleSelection;
});

function maximumLoan()
{
  var maxValue = parseInt(document.getElementById('maximum_loan_amount').value);
  var minValue = parseInt(document.getElementById('minimum_loan_amount').value);
  if(minValue >= maxValue)
  {
    alert('Minimum Loan Amount should not Be greater than or equal to Maximum Loan Amount');
    document.getElementById('submit').style.visibility = 'hidden';
  }
  else{
    document.getElementById('submit').style.visibility = 'visible';
  }

}

function maximumInstall(){
  var maxValue = parseInt(document.getElementById('maximum_number_of_installments').value);
  var minValue = parseInt(document.getElementById('minimum_number_of_installments').value);
  if(minValue >= maxValue)
  {
    alert('Minimum number of Installments should not Be greater than or equal to Maximum number of installments');
    document.getElementById('submit').style.visibility = 'hidden';
  }
  else{
    document.getElementById('submit').style.visibility = 'visible';
  } 
}

function maximumGuarnt(){
  var maxValue = parseInt(document.getElementById('maximum_number_of_guarantors').value);
  var minValue = parseInt(document.getElementById('minimum_number_of_guarantors').value);
  if( maxValue <= 4) {
  if(minValue >= maxValue)
  {
    alert('Minimum number of Guarantors should not Be greater than or equal to Maximum number of Guarantors');
    document.getElementById('submit').style.visibility = 'hidden';
  }
  else{
    document.getElementById('submit').style.visibility = 'visible';
  } 
}
else{
  alert('Maximum Guarantors should not be greater than 4');
  document.getElementById('submit').style.visibility = 'hidden';
  } 
}

function changeFunc() {
 
 var selectBox = document.getElementById("selectBox");
 var selected = document.getElementById("display");

 var selectedValue = selectBox.options[selectBox.selectedIndex].value;

 if(selected.style.display == "none") { selected.style.display = "block"; }
    else { selected.style.display = "none"; }

var block_to_insert ;
var container_block ;
 
block_to_insert = document.createElement( 'div');
block_to_insert.innerHTML = selectedValue ;
 
container_block = document.getElementById( 'loan_type_details' );
container_block.appendChild( block_to_insert );



 
}