var namesList = [];

// make list
document.getElementById('addNames').addEventListener('click', submitName);
var nameInput = document.getElementById('input');
nameInput.addEventListener('keypress', nameKeyPressed);

function nameKeyPressed() {
	if (event.charCode === 13) {
		submitName();
	}
};

var div, parentDiv = document.createElement('div');
function submitName() {
	var inputStr = nameInput.value;
	if(inputStr.length !== 0) {
		names = inputStr.split(',');
		names = names.map(function(name) {
			return name.trim();
		}).filter(function(name){
			return name;
		})
		namesList = namesList.concat(names);
		nameInput.value = '';
		nameInput.focus();
		document.getElementById('makeList').innerHTML = "";
		var div, parentDiv = document.createElement('div');
		namesList.forEach(function (name) {
			div = document.createElement('div');
			div.textContent = name;
			div.setAttribute('class', 'box col-md-1 col-xs-4');
			parentDiv.appendChild(div);
		});
		document.getElementById('makeList').appendChild(parentDiv);
	}
	return namesList;
};

// clear list
document.getElementById('clearList').addEventListener('click', function() {
	namesList = [];
	document.getElementById('makeList').innerHTML = "";
	document.getElementById('randomName').innerHTML = "";
	document.getElementById('teams').innerHTML = "";
});

// randomize
function randomIdx(arr) {
	return Math.floor(Math.random() * arr.length);
};

// get one random person
document.getElementById('getName').addEventListener('click', onePerson);
function onePerson() {
	if (namesList.length !== 0) {
		document.getElementById('randomName').innerHTML = "";
		var randomPerson = namesList[randomIdx(namesList)];
		var div = document.createElement('div');
		div.textContent = randomPerson;
		div.setAttribute('class', 'oneName');
		document.getElementById('randomName').appendChild(div);
	} else {
		if (document.getElementById('randomName').innerHTML === '') {
			var div = document.createElement('div');
			div.textContent = "please add people to the list first";
			div.setAttribute('class', 'warning subscript');
			document.getElementById('randomName').appendChild(div);
			nameInput.focus();
		}		
	}
};

// make random teams
document.getElementById('submitTeams').addEventListener('click', makeTeams);
var inputPerTeam = document.getElementById('inputPerTeam');

function makeTeams(perTeam) {
	var listForTeams = [].concat(namesList);
	var perTeam = parseInt(inputPerTeam.value);
	var teams = [];
	document.getElementById('teams').innerHTML = "";
	for (var i = 0; listForTeams.length > 0; i++) {
		teams = [];
		for (var j = 0; j < perTeam; j++) {
			teams = teams.concat(listForTeams.splice(randomIdx(listForTeams), 1));
		}
		var div = document.createElement('div');
			div.textContent = teams.join(', ');
			div.setAttribute('class', 'eachTeam');
		document.getElementById('teams').appendChild(div);
	}	
	inputPerTeam.value = '';
	inputPerTeam.focus();
};
inputPerTeam.addEventListener('keypress', teamKeyPressed);
function teamKeyPressed() {
	if (event.charCode === 13) {
		makeTeams();
	}
};
document.getElementById('clearTeams').addEventListener('click', function() {
	document.getElementById('teams').innerHTML = "";
});











