"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiltrosService = void 0;
const common_1 = require("@nestjs/common");
let FiltrosService = class FiltrosService {
    construirQuery(filtros) {
        const query = {};
        let categorias = [];
        if (filtros.nombre) {
            query.nombre = { $regex: new RegExp(filtros.nombre, 'i') };
        }
        if (filtros.categoria) {
            categorias = filtros.categoria.split(',').map(cat => cat.trim());
        }
        if (categorias.length > 0) {
            query.$or = categorias.map(cat => ({
                categoria: { $regex: new RegExp(cat, 'i') }
            }));
        }
        if (filtros.minPrecio || filtros.maxPrecio) {
            query.precio = {};
            if (filtros.minPrecio)
                query.precio.$gte = filtros.minPrecio;
            if (filtros.maxPrecio)
                query.precio.$lte = filtros.maxPrecio;
        }
        if (filtros.fechaInicio || filtros.fechaFin) {
            query.fecha_creacion = {};
            if (filtros.fechaInicio)
                query.fecha_creacion.$gte = new Date(filtros.fechaInicio);
            if (filtros.fechaFin)
                query.fecha_creacion.$lte = new Date(filtros.fechaFin);
        }
        const sort = {};
        if (filtros.ordenarPor) {
            sort[filtros.ordenarPor] = filtros.orden === 'desc' ? -1 : 1;
        }
        else {
            sort.precio = 1;
        }
        return { query, sort };
    }
};
exports.FiltrosService = FiltrosService;
exports.FiltrosService = FiltrosService = __decorate([
    (0, common_1.Injectable)()
], FiltrosService);
//# sourceMappingURL=filtros.services.js.map