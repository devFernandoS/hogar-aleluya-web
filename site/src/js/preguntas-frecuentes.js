/**
 * Script para Preguntas Frecuentes - Hogar Aleluya
 * Maneja: cambio de categorías y acordeón de preguntas
 */
(function () {
    'use strict';

    // Cambio de categorías
    const categorias = document.querySelectorAll('#categorias .categoria');
    const contenedorPreguntas = document.querySelectorAll('.contenedor-preguntas');

    if (categorias.length && contenedorPreguntas.length) {
        categorias.forEach(function (categoria) {
            categoria.addEventListener('click', function (e) {
                categorias.forEach(function (el) {
                    el.classList.remove('activa');
                });
                e.currentTarget.classList.add('activa');
                const catActiva = e.currentTarget.dataset.categoria;

                contenedorPreguntas.forEach(function (contenedor) {
                    if (contenedor.dataset.categoria === catActiva) {
                        contenedor.classList.add('activo');
                    } else {
                        contenedor.classList.remove('activo');
                    }
                });
            });
        });
    }

    // Acordeón de preguntas
    const preguntas = document.querySelectorAll('.preguntas .contenedor-pregunta');
    preguntas.forEach(function (pregunta) {
        pregunta.addEventListener('click', function (e) {
            const actual = e.currentTarget;
            const respuesta = actual.querySelector('.respuesta');

            actual.classList.toggle('activa');
            if (respuesta) {
                if (actual.classList.contains('activa')) {
                    respuesta.style.maxHeight = respuesta.scrollHeight + 'px';
                } else {
                    respuesta.style.maxHeight = null;
                }
            }

            preguntas.forEach(function (otra) {
                if (otra !== actual) {
                    otra.classList.remove('activa');
                    const otraResp = otra.querySelector('.respuesta');
                    if (otraResp) otraResp.style.maxHeight = null;
                }
            });
        });
    });
})();
