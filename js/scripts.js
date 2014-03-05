var Contact = {
  all: [],
  create: function(firstName, lastName) {
    var contact = Object.create(Contact);
    contact.initialize(firstName, lastName);
    Contact.all.push(contact);
    return contact;
  },
  initialize: function(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.addresses = [];
    this.numbers = [];
  },
  fullName: function() {
    return this.firstName + " " + this.lastName;  
  },
  createAddress: function(street, city, state) {
    var address = Object.create(Address);
    address.initialize(street, city, state);
    this.addresses.push(address);
  },
  createPhoneNumber: function(areaCode, firstThree, lastFour) {
    var phone = Object.create(Phone);
    phone.initialize(areaCode, firstThree, lastFour);
    this.numbers.push(phone);
  }
};

var Address = {
  initialize: function(street, city, state) {
    this.street = street;
    this.city = city;
    this.state = state;
  },
  fullAddress: function() {
    return this.street + ", " + this.city + ", " + this.state;
  }
};

var Phone = {
  initialize: function(areaCode, firstThree, lastFour) {
    this.areaCode = areaCode;
    this.firstThree = firstThree;
    this.lastFour = lastFour;
  },
  fullPhone: function() {
    return this.areaCode + "-"+ this.firstThree + "-" + this.lastFour;
  },
  valid: function() {
    if (((this.areaCode.length === 3) && (this.firstThree.length === 3) && (this.lastFour.length === 4)) && ((this.areaCode % 1 === 0) && (this.firstThree % 1 === 0) && (this.lastFour % 1 === 0))) {
      return true;
    } else {
      return false;
    }
  }
};

$(document).ready(function() {
  $("#new-address").click(function() {
    $("#new-addresses").append(
                                '<div class="new-address">' +
                                '<div class="form-group">' +
                                  '<label for="new-street">Street</label>' +
                                  '<input type="text" class="form-control new-street">' +
                                '</div>' +
                                '<div class="form-group">' +
                                  '<label for="new-city">City</label>' +
                                  '<input type="text" class="form-control new-city">' +
                                '</div>' +
                                '<div class="form-group">' +
                                  '<label for="new-state">State</label>' +
                                  '<input type="text" class="form-control new-state">' +
                                '</div>' +
                              '</div>')
  });

  $("#new-phone").click(function() {
        $("#new-phone-numbers").append(
                                          '<div class="new-phone">' +
                                            '<div class="col-xs-3 nopadding">' +
                                              '<div class="form-group">' +
                                                '<input type="text" class="form-control new-area-code">' +
                                              '</div>' +
                                            '</div>' +
                                            '<div class="col-xs-3 nopadding">  ' +
                                              '<div class="form-group">' +
                                                '<input type="text" class="form-control new-first-three">' +
                                              '</div>' +
                                            '</div>' +
                                            '<div class="col-xs-4 nopadding">' +
                                              '<div class="form-group">' +
                                                '<input type="text" class="form-control new-last-four">' +
                                              '</div>' +
                                            '</div>' +
                                            '</div>')
  });                

  $("form#new-contact").submit(function(event){
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();

    var newContact = Contact.create(inputtedFirstName,inputtedLastName);
    var newPhoneNumber; 
    
    $(".new-address").each(function(){
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();

      var newAddress = newContact.createAddress(inputtedStreet, inputtedCity, inputtedState);
    });

    $(".new-phone").each(function() {
      var inputtedAreaCode = $(this).find("input.new-area-code").val();
      var inputtedFirstThree = $(this).find("input.new-first-three").val();
      var inputtedLastFour = $(this).find("input.new-last-four").val();
      
      newPhoneNumber = newContact.createPhoneNumber(inputtedAreaCode, inputtedFirstThree, inputtedLastFour);
    });

    //if (newContact.numbers[0].valid()) {

      $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

      $(".contact").last().click(function() {
        $('#myModal').modal('show')

        $(".modal-title").text(newContact.fullName());
        $(".first-name").text(newContact.firstName);
        $(".last-name").text(newContact.lastName);

        $("ul#addresses").text("");
        newContact.addresses.forEach(function(address) {
          $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
        });

        $("ul#phone-numbers").text("");
        newContact.numbers.forEach(function(number) {
          $("ul#phone-numbers").append("<li>" + number.fullPhone() + "</li>");    
        });
      });
    this.reset();
  //} else {
   // alert("Please enter a valid phone number!");
  //  $(".new-area-code").val("");
  //  $(".new-first-three").val("");
   // $(".new-last-four").val("");
 // }
  });
});
