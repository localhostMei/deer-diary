// Todo: Add confirmation to deletion, ending the session and loading a file

function List() {
	this.maxLength = 1;
	this.length = 0,
	this.add = function(value) {
		this[this.length] = value;
		this.length++;
		if (this.length === this.maxLength) {
			this.maxLength *= 2;
		}
		return true;
	},
	this.remove = function(index) {
		if (this.length === 0) {
			return false;
		}
		for (let i = index + 1; i <= this.length; i++) {
			this[i - 1] = this[i];
		}
		delete this[this.length - 1];
		this.length--;
		return true;
	}
}

function LinkedList() {
	this.increment = 0,
	this.head = null,
	this.tail = null,
	this.previous = function(position) {
		if (this.head === position) {
			return false;
		}
		let index = this.head;
		while (index !== null) {
			if (this[index].next === position) {
				return index;
			}
			index = this[index].next;
		}
		return false;
	}
	this.search = function(value) {
		let index = this.head;
		while (index !== null) {
			if (this[index].date === value) {
				return index;
			}
			index = this[index].next;
		}
		return false;
	}
	this.append = function(value) {
		if (this.search(value.date) !== false) {
			return false;
		}
		if (this.head === null) {
			this.head = this.increment;
		}
		value.next = null;
		this[this.increment] = value;
		this[this.tail].next = this.increment;
		this.tail = this.increment;
		this.increment++;
		return true;
	}
	this.prepend = function(value) {
		if (this.search(value.date) !== false) {
			return false;
		}
		if (this.head === null) {
			this.tail = this.increment;
		}
		this[this.increment] = value;
		this[this.increment].next = this.head;
		this.head = this.increment;
		this.increment++;
		return true;
	}
	this.insert = function(value, position) {
		if (this.search(value.date) !== false) {
			return false;
		}
		if (this[position] === undefined) {
			return false;
		}
		if (this.tail === position) {
			this.tail = this.increment;
		}
		this[this.increment] = value;
		this[this.increment].next = this[position].next;
		this[position].next = this.increment;
		this.increment++;
		return true;
	}
	this.remove = function(position) {
		if (this.head === null) {
			return false;
		}
		if (this.head === this.tail) {
			this.head = null;
			this.tail = null;
		} else if (this.tail === position) {
			this.tail = this.previous(position);
			this[this.previous(position)].next = null;
		} else if (this.head === position) {
			this.head = this[this.head].next;
		} else {	
			this[this.previous(position)].next = this[position].next;
		}
		delete this[position];
		return true;
	}
	this.place = function(value) {
		if (this.search(value.date) !== false) {
			return false;
		}
		if (this.head === null) {
			this.head = this.increment;
			this.tail = this.increment;
			this[this.increment] = value;
			this.increment++;
			return true;
		}
		let splitDate = value.date.split(".");
		let valueDate = new Date(splitDate[2], splitDate[1] - 1, splitDate[0]);
		splitDate = this[this.head].date.split(".");
		let headDate = new Date(splitDate[2], splitDate[1] - 1, splitDate[0]);
		if (valueDate < headDate) {
			this.prepend(value);
			return true;
		}
		let index = this.head;
		while (this[index].next !== null) {
			splitDate = this[this[index].next].date.split(".");
			if (new Date(splitDate[2], splitDate[1] - 1, splitDate[0]) > valueDate) {
				this.insert(value, index);
				return true;
			}
			index = this[index].next;
		}
		this.append(value);
		return true;
	}
	this.print = function() {
		let index = this.head;
		let output = "";
		while (index !== null) {
			output += `{${index}} [${this[index].date}] `;
			for (let i = 0; i < this[index].entries.length; i++) {
				output += `(${this[index].entries[i].title} | ${this[index].entries[i].content}) `;
			}
			output += `\n`;
			index = this[index].next;
		}
		console.log(output);
		return true;
	}
	this.log = function() {
		entriesLog.innerHTML = "";
		if (currentPosition === false) {
			return false;
		}
		for (let i = 0; i < this[currentPosition].entries.length; i++) {
			logEntry(this[currentPosition].entries[i], i);
		}
	}
}

function entry(title, content) {
	this.title = title;
	this.content = content;
}

function day(date) {
	this.date = date;
	this.next = null;
	this.entries = new List();
}

function entryFormShow() {
	title.value = "";
	content.value = "";
	entryForm.style.display = "flex";
}

function entryFormHide() {
	entryForm.style.display = "none";
	entryFormError.style.visibility = "hidden";
}

function newEntry() {
	if (title.value === "" || content.value === "") {
		entryFormError.style.visibility = "visible";
		return false;
	}
	entryFormHide();
	days.place(new day(current));
	globalVarUpdate();
	const tempEntry = new entry(title.value, content.value);
	days[currentPosition].entries.add(tempEntry);
	days.log();
	return true;
}

function navPrevious() {
	currentDate.setDate(currentDate.getDate() - 1);
	globalVarUpdate();
	return true;
}

function navNext() {
	currentDate.setDate(currentDate.getDate() + 1);
	globalVarUpdate();
	return true;
}

function navOldest() {
	let splitDate = days[days.head].date.split(".");
	currentDate.setFullYear(splitDate[2], splitDate[1] - 1, splitDate[0]);
	globalVarUpdate();
	return true;
}

function navLatest() {
	let splitDate = days[days.tail].date.split(".");
	currentDate.setFullYear(splitDate[2], splitDate[1] - 1, splitDate[0]);
	globalVarUpdate();
	return true;
}

function removeEntry(index) {
	if (currentPosition === false) {
		return false;
	}
	days[currentPosition].entries.remove(index);
	if (days[currentPosition].entries.length == 0) {
		days.remove(currentPosition);
	}
	globalVarUpdate();
	return true;
}

function logEntry(value, index) {
	let entry = document.createElement("div");
	entry.innerHTML = `<button onclick="removeEntry(${index})">Remove</button><h2>${index + 1}. ${value.title}</h2><p>${value.content}</p>`;
	entriesLog.appendChild(entry);
}

function saveDiary() {
	const a = document.createElement("a");
	a.href = URL.createObjectURL(new Blob([JSON.stringify(days, null, 2)], {
	}));
	a.setAttribute("download", "data.json");
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

function loadDiary() {
	var input = document.createElement('input');
	input.type = 'file';
	input.onchange = e => { 
		var file = e.target.files[0]; 
		var reader = new FileReader();
		reader.readAsText(file,'UTF-8');
		reader.onload = readerEvent => {
			const tempDays = new LinkedList();
			const content = JSON.parse(readerEvent.target.result);
			if (content.increment === undefined) {
				return false;
			}
			for (let i = 0; i < content.increment; i++) {
				if (content[i] == undefined) {
					continue;
				}
				tempDays.place(new day(content[i].date));
				let tempPosition = tempDays.search(content[i].date);
				for (let j = 0; j < content[i].entries.length; j++) {
					const tempEntry = new entry(content[i].entries[j].title, content[i].entries[j].content);
					tempDays[tempPosition].entries.add(tempEntry);
				}
			}
			unloadDiary();
			days = tempDays;
			globalVarUpdate();
		}
	}
	input.click();
}

function unloadDiary() {
	entryFormHide();
	days = new LinkedList();
	today = new Date();
	currentDate = today;
	current = currentDate.toLocaleDateString("cs-CZ", { day: 'numeric', year: 'numeric', month: 'numeric'  }).replace(/\s/g, "");
	currentPosition = days.search(current);
	currentLog.innerText = currentDate.toLocaleDateString("cs-CZ", { day: 'numeric', year: 'numeric', month: 'numeric'  });
	days.log();
}

function globalVarUpdate() {
	entryFormHide();
	current = currentDate.toLocaleDateString("cs-CZ", { day: 'numeric', year: 'numeric', month: 'numeric'  }).replace(/\s/g, "");
	currentPosition = days.search(current);
	currentLog.innerText = currentDate.toLocaleDateString("cs-CZ", { day: 'numeric', year: 'numeric', month: 'numeric'  });
	days.log();
	return true;
}

// Global variables
let days = new LinkedList();

let today = new Date();
let currentDate = today;
let current = currentDate.toLocaleDateString("cs-CZ", { day: 'numeric', year: 'numeric', month: 'numeric'  }).replace(/\s/g, "");
let currentPosition = days.search(current);

const title = document.getElementById("title");
const content = document.getElementById("content");
const currentLog = document.getElementById("current");
const entriesLog = document.getElementById("entries");
const entryForm = document.getElementById("entryForm");
const entryFormError = document.getElementById("entryFormError");
currentLog.innerText = currentDate.toLocaleDateString("cs-CZ", { day: 'numeric', year: 'numeric', month: 'numeric'  });