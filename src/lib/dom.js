// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

import _foreach from './foreach';

// optimizing
/* eslint no-undef: 0 */
const _document = document;
const _window = window;

export const globals = {
    document: _document,
    window: _window
};

// wrapper
export function getDocument(){
    return _document;
}

// wrapper
export function getWindow(){
    return _window;
}

// set the elements visibility
export function displayElement(el, visible = true){
    el.style.display = (visible === true ? 'block' : 'none');
}

// remove element
export function disposeElement(el){
    el.parentNode.removeChild(el);
}

// get array of matched elements
export function getElements(selector){
    return (selector != null && selector.length > 0) ? _document.querySelectorAll(selector) : [];
}

// get first matched element
export function getElement(selector){
    return (selector != null && selector.length > 0) ? _document.querySelector(selector) : null;
}

// get data attribute
export function getElementDataAttribute(el, attb){
    return el.getAttribute('data-' + attb) || null;
}

// get attribute
export function getElementAttribute(el, attb){
    return el.getAttribute(attb) || null;
}

// add element before the original container
export function insertBefore(origin, element){
    return origin.parentNode.insertBefore(element, origin);
}

// add class to element
export function addClass(element, name){
    if (!element.classList.contains(name)){
        element.classList.add(name);
    }
}

// remove class from element
export function removeClass(element, name){
    if (element.classList.contains(name)){
        element.classList.remove(name);
    }
}

// has class
export function hasClass(element, name){
    return (element.classList.contains(name));
}

// toggle element class
export function toggleClass(element, name){
    if (element.classList.contains(name)){
        element.classList.remove(name);
    }else{
        element.classList.add(name);
    }
}

// create a new dom element with given attributes / text / dom nodes
export function createElement(element, attributes, ...content){

    // is function ? passthrough
    if (typeof element === 'function'){
        return element(attributes || {}, ...content);
    }

    // create new dom element
    const el = _document.createElement(element);

    // inner content set ?
    if (content.length > 0){

        // push nodes to parent element
        _foreach(content, function (node){
            // valid element ?
            if (!node){
                return;
            }

            // array ?
            if (node.push){

                _foreach(node, function(node2){
                    // standard dom node ?
                    if (node2.appendChild){
                        el.appendChild(node2);

                    // text node
                    }else{
                        el.appendChild(_document.createTextNode(node2));
                    }
                });

            // standard dom node ?
            }else if (node.appendChild){
                el.appendChild(node);

            // text node
            }else{
                el.appendChild(_document.createTextNode(node));
            }
        });
    }

    // utility function to add event listener
    function addEventListener(event, cb){
         // register listener
         el.addEventListener(event, function(evt){
            // disable defaults, disable propagation
            evt.preventDefault();
            evt.stopPropagation();

            // bind this to event listener
            if (cb){
                cb.apply(el, [evt, el]);
            }
        });
    }

    // set attributes
    _foreach(attributes, function(attbValue, attbName){
        // event ?
        if (attbName.substr(0, 2) === 'on'){
            // ignore null events
            if (attbValue === null){
                return;
            }

            // extract event type
            const type = attbName.substr(2).toLowerCase();

            // register listener
            addEventListener(type, attbValue);

        // set attribute
        }else{
            // className set ? transform
            if (attbName === 'className'){
                attbName = 'class';
            }
            el.setAttribute(attbName, attbValue);
        }
    });

    // extend element
    el.on = addEventListener;

    return el;
}