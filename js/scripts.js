var Tamagotchi = {
    all: [],
    initialize: function(name){
        this.name = name;
        this.foodLevel = 10;
        this.sleepLevel = 10;
        this.activeLevel = 10;
    },
    timePasses: function(){
        return this.foodLevel -= 1, this.activeLevel -= 1, this.sleepLevel -= 1;
    },
    isAlive: function(){
        if(this.foodLevel > 0 && this.activeLevel > 0  && this.sleepLevel > 0){
            return true;
        }else{
            return false;
        }
    },
    toFeed: function(){
        return this.foodLevel += 3;
    },
    toSleep: function(){
        return this.sleepLevel += 3;
    },
    toWalk: function(){
        return this.activeLevel += 3;
    }
}

function update() {
    for (var pet in  Tamagotchi.all) {
        $('#image').empty();
        if (Tamagotchi.all[pet].isAlive()){
            Tamagotchi.all[pet].timePasses();
            $('#p-eat').empty().append(Tamagotchi.all[pet].foodLevel);
            $('#p-active').empty().append(Tamagotchi.all[pet].activeLevel);
            $('#p-sleep').empty().append(Tamagotchi.all[pet].sleepLevel);

        }else{
            $('#image').empty().append('<p>' + Tamagotchi.all[pet].name + ' DIED'+ '</p>'+'<img src = "img/1.jpg">');
            Tamagotchi.all.splice(pet, 1);
            return;
        }
    }
}

$(document).ready(function() {

    var current_pet = Object.create(Tamagotchi);

    $('#create-form').submit(function(event) {
        event.preventDefault();

        var new_pet = Object.create(Tamagotchi);
        new_pet.initialize($('input#create').val());
        if(new_pet.name != false){
            Tamagotchi.all.push(new_pet);
            $('ul#pets').append('<li><span>' + new_pet.name + '</span></li>');
        }else{
            alert("Write a name correctly!");
        }
        $('input#create').val('');

        $('#pets li').last().click(function() {
            current_pet = new_pet;
            $('#current-pet').empty().text(current_pet.name);
            $('#pet-info').show();
            $('#p-eat').empty().append(current_pet.foodLevel);
            $('#p-active').empty().append(current_pet.activeLevel);
            $('#p-sleep').empty().append(current_pet.sleepLevel);
        });

    });

    $('#eat').click(function(){
        current_pet.name = $('#current-pet').text();
        current_pet.toFeed();
        $('#p-eat').empty().append(current_pet.foodLevel);
    });

    $('#sleep').click(function(){
        current_pet.name = $('#current-pet').text();
        current_pet.toSleep();
        $('#p-sleep').empty().append(current_pet.sleepLevel);

    });

    $('#active').click(function(){
        current_pet.name = $('#current-pet').text();
        current_pet.toWalk();
        $('#p-active').empty().append(current_pet.activeLevel);
    });

    setInterval(update, 3000);
});





