
function List() {
	this.length = 0,
	this.add = function(value) {
		this[this.length] = value;
		this.length++;
	},
	this.remove = function(index) {
		if (this.length === 0) {
			return;
		}
		for (let i = index + 1; i <= this.length; i++) {
			this[i - 1] = this[i];
		}
		delete this[this.length - 1];
		this.length--;
	}
}

function LinkedList() {
	this.increment = 0,
	this.head = null,
	this.tail = null,
	this.previous = function(position) {
		let index = this.head;
		while (index !== null) {
			if (this[index].next === position) {
				return index;
			}
			index = this[index].next;
		}
		return;
	}
	this.search = function(value) {
		let index = this.head;
		while (index !== null) {
			if (this[index].date === value) {
				return index;
			}
			index = this[index].next;
		}
		return;
	}
	this.append = function(value) {
		if (this.search(value.date) !== undefined) {
			return;
		}
		if (this.head === null) {
			this.head = this.increment;
			this.tail = this.increment;
			this[this.increment] = value;
			this.increment++;
			return;
		}
		this[this.increment] = value;
		this[this.tail].next = this.increment;
		this.tail = this.increment;
		this.increment++;
	}
	this.prepend = function(value) {
		if (this.search(value.date) !== undefined) {
			return;
		}
		if (this.head === null) {
			this.head = this.increment;
			this.tail = this.increment;
			this[this.increment] = value;
			this.increment++;
			return;
		}
		this[this.increment] = value;
		this[this.increment].next = this.head;
		this.head = this.increment;
		this.increment++;
	}
	this.insert = function(value, position) {
		if (this.search(value.date) !== undefined) {
			return;
		}
		if (this.head === null) {
			this.head = this.increment;
			this.tail = this.increment;
			this[this.increment] = value;
			this.increment++;
			return;
		}
		if (this.tail === position) {
			this.tail = this.increment;
		}
		this[this.increment] = value;
		this[this.increment].next = this[position].next;
		this[position].next = this.increment;
		this.increment++;
	}
	this.remove = function(position) {
		if (this.head === null) {
			return;
		}
		if (this.tail === position) {
			this.tail = this.previous(position);
		}
		if (this.head === position) {
			this.head = this[this.head].next;
		} else {	
			this[this.previous(position)].next = this[position].next;
			delete this[position];
		}
	}
	this.print = function() {
		let index = this.head;
		let output = "";
		while (index !== null) {
			output += `[${index}] (${this[index].date}) \n`;
			index = this[index].next;
		}
		console.log(output);
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

function newEntry() {
	
}

function navPrevious() {
	
}

function navNext() {
	
}

function navOldest() {
	console.log("Test");
}

function navLatest() {
	
}

function removeEntry() {
	
}

function saveDiary() {
	
}

function loadDiary() {
	
}

function unloadDiary() {
	
}

// This is where the valley of functions ends
let today = new Date().toLocaleDateString("cs-CZ", { day: 'numeric', year: 'numeric', month: 'numeric'  }).replace(/\s/g, "");