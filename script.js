function List() {
	this.length = 0,
	this.add = function(value) {
		this[this.length] = value;
		this.length++;
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

// Todo: Clean up
function LinkedList() {
	this.increment = 0,
	this.head = null,
	this.tail = null,
	// Function previous() takes in a position and returns the position of the previous node
	this.previous = function(position) {
		let index = this.head;
		while (index !== null) {
			if (this[index].next === position) {
				return index;
			}
			index = this[index].next;
		}
		return false;
	}
	// Function search() takes in an entry and returns the position if it's already in the linked list
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
	// Function append() takes an entry and adds it to the tail of the linked list
	this.append = function(value) {
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
		this[this.increment] = value;
		this[this.tail].next = this.increment;
		this.tail = this.increment;
		this.increment++;
		return true;
	}
	// Function prepend() takes an entry and adds it before the head of the linked list
	this.prepend = function(value) {
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
		this[this.increment] = value;
		this[this.increment].next = this.head;
		this.head = this.increment;
		this.increment++;
		return true;
	}
	// Function insert() takes an entry and position and adds it after the node on position
	this.insert = function(value, position) {
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
		if (this.tail === position) {
			this.tail = this.increment;
		}
		this[this.increment] = value;
		this[this.increment].next = this[position].next;
		this[position].next = this.increment;
		this.increment++;
		return true;
	}
	// Function remove() takes a position and deletes its node
	this.remove = function(position) {
		if (this.head === null) {
			return false;
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
	// Function place() takes an entry and adds it to the linked list to its appropriate position based on date
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
		let valueDate = value.date;
		const [valueDay, valueMonth, valueYear] = valueDate.split(".").map(Number);
		if (this[this.head].next === null) {
			let headDate = this[this.head].date;
			const [headDateDay, headDateMonth, headDateYear] = headDate.split(".").map(Number);
			if (headDateYear > valueYear || (headDateYear === valueYear && headDateMonth > valueMonth) || (headDateYear === valueYear && headDateMonth === valueMonth && headDateDay > valueDay)) {
				this.prepend(value);
			} else {
				this.append(value);
			}
			return true;
		}
		let index = this.head;
		let headNextDate = this[this[this.head].next].date;
		const [headNextDay, headNextMonth, headNextYear] = headNextDate.split(".").map(Number);
		if (headNextYear > valueYear || (headNextYear === valueYear && headNextMonth > valueMonth) || (headNextYear === valueYear && headNextMonth === valueMonth && headNextDay > valueDay)) {
			this.prepend(value);
			return true;
		}
		while (this[index].next !== null) {
			let nextDate = this[this[index].next].date;
			const [nextDateDay, nextDateMonth, nextDateYear] = nextDate.split(".").map(Number);
			if (nextDateYear > valueYear || (nextDateYear === valueYear && nextDateMonth > valueMonth) || (nextDateYear === valueYear && nextDateMonth === valueMonth && nextDateDay > valueDay)) {
				this.insert(value, index);
				return true;
			}
			index = this[index].next;
		}
		this.append(value);
		return true;
	}
	// Function print() logs the linked list and its contents in console
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
	days.place(new day(current));
	days[days.search(current)].entries.add(new entry(title, content));
	days.print();
}

// Todo
function navPrevious() {
	
}

// Todo
function navNext() {
	
}

// Todo
function navOldest() {
	console.log("Test");
}

// Todo
function navLatest() {
	
}

// Todo
function removeEntry() {
	
}

// Todo
function saveDiary() {
	
}

// Todo
function loadDiary() {
	
}

// Todo
function unloadDiary() {
	
}

// This is where the valley of functions ends
const days = new LinkedList();
let today = new Date().toLocaleDateString("cs-CZ", { day: 'numeric', year: 'numeric', month: 'numeric'  }).replace(/\s/g, "");
let currentDate = today;
let current = currentDate;

let title = "lalalalalalala";
let content = "lalalalalalala";

// Testing area


// newEntry("Lucy", "Lucyloo");
// newEntry("Mei", "Meimeimei");
// days.place(new day(currentDate));


// days.insert(new day("01.11.2026"), days.place(new day("01.11.2026")));
// days[days.search("01.11.2026")].entries.add(new entry("Mei's day", "Lulu"));
days.print();