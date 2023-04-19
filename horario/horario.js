class Calendar {
    //Este constructor inicializa una instancia de la clase con las propiedades elem, year y month, 
    //y crea una nueva instancia de la clase Date con el año y mes especificados. Luego, llama al método _insertCalendar() 
    //para insertar el calendario en el elemento elem.
    constructor({ elem, year, month }) {
      this.elem = elem;
      this.year = year;
      this.month = month;
      this.date = new Date(year, month - 1);
      this._insertCalendar();
   }  
   
   
    //Esta función agrega dinámicamente nuevas filas a una tabla HTML.
    _addRow(table) {
      let row = document.createElement("tr");
      table.append(row);
    }
    //Esta función agrega dinámicamente nuevas celdas a una fila de tabla HTML.
    _addCell(row) {
      let cell = document.createElement("td");
      row.append(cell);
    }
    //Muestre el nombre delmes actual
    _getMonthString() {
      let months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ];
      return months[this.date.getMonth()];
    }
    //Construye una tabla HTML para mostrar un calendario para el mes y el año dados.
    _constructTable() {
      let table = document.createElement("table");
      table.innerHTML =
        '<table><thead><tr><th></th></tr><tr><th>Lun</th><th>Mar</th><th>Mier</th><th>Jue</th><th>Vie</th><th class="holyday">Sab</th><th class="holyday">Dom</th></tr></thead><tbody></tbody></table>';
      table.rows[0].cells[0].colSpan = 7;
      table.rows[0].cells[0].innerHTML = this._getMonthString() + " " + this.year;
      for (let row = 2; row < 8; row++) {
        this._addRow(table.tBodies[0]);
        table.rows[row].dataset.week = "" + (row - 1);
        for (let cell = 0; cell < 7; cell++) {
          this._addCell(table.rows[table.rows.length - 1]);
          if (cell === 6) {
            table.rows[row].cells[cell].dataset.weekDay = "" + 0;
          } else table.rows[row].cells[cell].dataset.weekDay = "" + (cell + 1);
        }
      }
      return table;
    }
    //Construye un calendario para el mes y el año dados utilizando la tabla HTML creada por la función _constructTable. 
    //La función no toma ningún parámetro y devuelve el elemento de tabla resultante.
    _constructCalendar() {
      let table = this._constructTable();
      outer: while (this.date.getMonth() < this.month) {
        let d = 0;
        for (let row = 2; row < 8; row++) {
          for (let cell = 0; cell < 7; cell++) {
            this.date.setDate(this.date.getDate() + d);
            if (this.date.getDay() != table.rows[2].cells[cell].dataset.weekDay)
              continue;
            if (
              this.date.getMonth() > this.month - 1 ||
              (this.date.getMonth() == 0 && this.month == 12)
            ) {
              while (table.rows[table.rows.length - 1].cells[0].innerHTML === "")
                table.tBodies[0].lastElementChild.remove();
              break outer;
            }
            table.rows[row].cells[cell].innerHTML = "" + this.date.getDate();
            d = 1;
          }
        }
        this.date.setDate(date.getDate() + d);
      }
      return table;
    }
    //La función itera a través de cada celda de la tabla calendar. Para cada celda, la función comprueba si el número de día actual coincide con el 
    //contenido de la celda (currentDay.innerHTML), si el mes actual coincide con el mes deseado (this.month - 1) y si el año actual coincide con el 
    //año deseado (this.year). Si se cumplen estas condiciones, la función agrega la clase today a la celda para resaltar el día actual.
    //Además, si la celda representa un sábado o domingo (día de fin de semana), la función agrega la clase holyday para resaltar que es un día no laborable.
    _insertCalendar() {
      let calendar = this._constructCalendar();
      let date = new Date();
      for (let week = 0; week < calendar.rows.length; week++) {
        for (let day = 0; day < calendar.rows[week].cells.length; day++) {
          let currentDay = calendar.rows[week].cells[day];
          if (
            date.getDate() == currentDay.innerHTML &&
            date.getMonth() === this.month - 1 &&
            date.getFullYear() === this.year
          ) {
            currentDay.classList.add("today");
          }
          if (currentDay.dataset.weekDay == 0 || currentDay.dataset.weekDay == 6) {
            currentDay.classList.add("holyday");
            currentDay.addEventListener('click', function() {
              // Mostrar popup para fin de semana
              var popUpFinSemana = document.getElementById("popUpFinSemana");
              popUpFinSemana.style.display = "block";
              popUpFinSemana.style.zIndex = '1';
              popUpSemana.style.display = "none";
            });
          } else {
            currentDay.addEventListener('click', function() {
              // Mostrar popup para días laborables
              var popUpSemana = document.getElementById("popUpSemana");
              popUpSemana.style.display = "block";
              popUpFinSemana.style.display = "none";
            });
          }
        }
      }
      this.elem.appendChild(calendar);
    }
  }
  
  //La variable body almacena una referencia al elemento body del documento HTML actual, que se puede utilizar posteriormente para agregar 
  //elementos al cuerpo del documento.
  //La variable date crea un nuevo objeto Date, que representa la fecha y hora actuales.
  let body = document.body;
  let date = new Date();
  
  //Creo y agrego un encabezado (<h1>) que muestra el año actual en la parte superior de la página.
  let h1 = document.createElement("h1");
  h1.innerHTML = date.getFullYear();
  body.insertBefore(h1, body.lastElementChild);
  
  //Creo y agrego un nuevo contenedor de calendario anual para el año 2018 al cuerpo del documento, justo debajo del encabezado recién agregado.
  let yearCalendar2018 = document.createElement("div");
  yearCalendar2018.id = "2018";
  yearCalendar2018.classList.add("yearCalendar");
  body.lastElementChild.before(yearCalendar2018);
  
  //Crear calendario de todos los meses
  let months2018 = [
    {
      name: "january",
      index: 1,
      node: createDiv(),
      calendar: createMonthCalendar
    },
    {
      name: "february",
      index: 2,
      node: createDiv(),
      calendar: createMonthCalendar
    },
    {
      name: "march",
      index: 3,
      node: createDiv(),
      calendar: createMonthCalendar
    },
    {
      name: "april",
      index: 4,
      node: createDiv(),
      calendar: createMonthCalendar
    },
    {
      name: "may",
      index: 5,
      node: createDiv(),
      calendar: createMonthCalendar
    },
    {
      name: "june",
      index: 6,
      node: createDiv(),
      calendar: createMonthCalendar
    },
    {
      name: "july",
      index: 7,
      node: createDiv(),
      calendar: createMonthCalendar
    },
    {
      name: "august",
      index: 8,
      node: createDiv(),
      calendar: createMonthCalendar
    },
    {
      name: "september",
      index: 9,
      node: createDiv(),
      calendar: createMonthCalendar
    },
    {
      name: "october",
      index: 10,
      node: createDiv(),
      calendar: createMonthCalendar
    },
    {
      name: "november",
      index: 11,
      node: createDiv(),
      calendar: createMonthCalendar
    },
    {
      name: "december",
      index: 12,
      node: createDiv(),
      calendar: createMonthCalendar
    }
  ];
  
  //Crear y agregar todos los calendarios mensuales
  for (let month = 0; month < 12; month++) {
    yearCalendar2018.append(months2018[month].calendar());
  }
  
  //Agregan un nuevo título de encabezado que muestra el año siguiente al calendario de 2018.
  let h1Clone = h1.cloneNode(true);
  h1Clone.innerHTML = (date.getFullYear() + 1);
  yearCalendar2018.after(h1Clone);
  
  //Este código crea una nueva variable yearCalendar2019 que es una copia exacta de yearCalendar2018
  let yearCalendar2019 = yearCalendar2018.cloneNode();
  yearCalendar2019.id = "2019";
  body.lastElementChild.before(yearCalendar2019);
  
  //creando un arreglo llamado "months2019" que contiene objetos para cada mes del año 2019.
  let months2019 = [
    {
      name: "january",
      index: 1,
      node: createDiv(),
      calendar: createMonthCalendar
    },
    {
      name: "february",
      index: 2,
      node: createDiv(),
      calendar: createMonthCalendar
    },
    {
      name: "march",
      index: 3,
      node: createDiv(),
      calendar: createMonthCalendar
    },
    {
      name: "april",
      index: 4,
      node: createDiv(),
      calendar: createMonthCalendar
    },
    {
      name: "may",
      index: 5,
      node: createDiv(),
      calendar: createMonthCalendar
    },
    {
      name: "june",
      index: 6,
      node: createDiv(),
      calendar: createMonthCalendar
    },
    {
      name: "july",
      index: 7,
      node: createDiv(),
      calendar: createMonthCalendar
    },
    {
      name: "august",
      index: 8,
      node: createDiv(),
      calendar: createMonthCalendar
    },
    {
      name: "september",
      index: 9,
      node: createDiv(),
      calendar: createMonthCalendar
    },
    {
      name: "october",
      index: 10,
      node: createDiv(),
      calendar: createMonthCalendar
    },
    {
      name: "november",
      index: 11,
      node: createDiv(),
      calendar: createMonthCalendar
    },
    {
      name: "december",
      index: 12,
      node: createDiv(),
      calendar: createMonthCalendar
    }
  ];
  
  //Estas líneas de código actualizan la fecha del calendario a 2019 y crean un nuevo conjunto de 12 meses para el año 2019.
  date.setFullYear(date.getFullYear() + 1);
  for (let month = 0; month < 12; month++) {
    yearCalendar2019.append(months2019[month].calendar());
  }
  
  //Crea y devuelve un nuevo elemento HTML <div>
  function createDiv() {
    return document.createElement("div");
  }
  
  //Devuelve un nodo div que contiene el calendario para un mes específico. 
  function createMonthCalendar() {
    let calendar = new Calendar({
      elem: this.node,
      year: date.getFullYear(),
      month: this.index
    });
    this.node.id = this.name;
    this.node.classList.add("month");
    return this.node;
  }


  function closePopup(){
    var popUpFinSemana = document.getElementById("popUpFinSemana");
    var popUpSemana = document.getElementById("popUpSemana");
    popUpFinSemana.style.display = "none";
    popUpSemana.style.display = "none";
  }