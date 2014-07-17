var pi    = Math.PI;

window.onload = function() {
    score.element   = document.getElementById("score");
    problem.element = document.getElementById("problem");
    answer.element  = document.getElementById("answer");
    message.element = document.getElementById("message"); 
    new_game();
};

var angle = {

    angles    : [0, 30, 45, 60, 90],
    random : function() { var deg = random_element( this.angles );
                          return { degrees: deg,
                                   radians: radians_from_degrees(deg) };
                        }
    
};

var trig = {

    functions : ["sin", "cos", "tan"],
    
    sin: function(n) { return Math.sin(n); },
    cos: function(n) { return Math.cos(n); },
    tan: function(n) { return Math.tan(n); },

    random_function : function() { return random_element(this.functions); },

    random_problem  : function() {
        var func = this.random_function(),
            ang  = angle.random();
        
        return { prob    : func + "(" + ang.degrees + ")", 
                 answer  : this[func].apply(this, [ang.radians]).toFixed(4)
               };
    }


};


var problem = {
    element : null,
    current : null,
    new_prob: function() { this.current = trig.random_problem();
                           this.display(); },

    display : function() { this.element.innerHTML = this.current.prob; },
    solved  : function() { return answer.val() == this.current.answer; }
};

var answer = {
    element : null,
    val     : function() {return this.element.value;},
    clear   : function() {this.element.value = "";}
};

var score = {
    element : null,
    val : 0,
    
    display : function() { this.element.value = this.val; },
    
    reset   : function() { this.val = 0;
                           this.display(); },
    
    inc     : function() { ++this.val;
                           this.display();
                           return this.val; } 
};

var message = {
    element : null,
    display : function(text) { this.element.innerHTML = text; },
    clear   : function()     {this.display("");}
};

function random_element(array) {
    var rand  = Math.random(),
        len   = array.length,
        index = Math.floor(rand * len);
    return array[index];
};


function radians_from_degrees(degrees) {
    return (degrees * (pi / 180)).toFixed(4);
};
function degrees_from_radians(radians) {
    return (radians * (180 / pi)).toFixed(4);
};

function enter_answer() {
    problem.solved() ? (
        message.display("Correct!"),
        score.inc(),
        new_round()
    ):(
        message.display("Incorrect. The correct answer is " + problem.current.answer + "."),
        new_round()
    );
};

function new_round() {
    problem.new_prob();
    answer.clear();
};

function new_game() {
    score.reset();
    new_round();
};
