class Zoologico {
    constructor(idAnimal, nombre, jaulaNumero, idTipoAnimal, peso) {
        this._idAnimal = idAnimal;
        this._nombre = nombre;
        this._jaulaNumero = parseInt(jaulaNumero);
        this._idTipoAnimal = parseInt(idTipoAnimal);
        this._peso = parseFloat(peso);
    }

    get idAnimal() {
        return this._idAnimal;
    }

    get nombre() {
        return this._nombre;
    }

    get jaulaNumero() {
        return this._jaulaNumero;
    }

    get idTipoAnimal() {
        return this._idTipoAnimal;
    }

    get peso() {
        return this._peso;
    }
}