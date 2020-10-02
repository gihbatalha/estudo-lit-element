import {LitElement, html, css} from 'lit-element';
import {FilterAPILocalStorage, Filter, FilterType} from '../apis/filterAPILocalStorage'



export class Filters extends LitElement {

    constructor(){
        super();
        this._brands = [];
        this.teste = ["ab","cd"]

        console.log(FilterAPILocalStorage)
        this.api = new FilterAPILocalStorage(localStorage);
    }

    static get styles(){
        return css`
            .container .title{
                font-family: 'Karla',Arial, Helvetica, sans-serif;
            }

            .container h2{
                margin:0;
                padding: 0;
                font-size: 14px;
                font-weight: 400;
            }

            .container h3{
                margin:5px 0px 0px 0px;
                padding: 10px 0px 10px 0px;
                font-size: 10px;
                font-weight: bold;
            }

            .container a{
                text-decoration: none;
                color: #3498db;
                font-size: 9px;
            }

            .container ul{
                margin: 0;
                padding: 0;
                text-decoration: none;
                list-style: none;
            }

            #brand-container{
                display: flex;
                flex-direction: column;
            }

            #brand-container > div{
                display: flex;
                align-items: center;
                align-content: center;
            }

            #brand-container .more{
                margin-top:8px;
                padding-left: 15px;
            }

            #color-container ul{
                display: flex;
                flex-wrap: wrap;
            }

            #color-container li{
                width: 40px;
                height: 40px;
                background-color: black;
                margin: 5px;
                border-radius: 5em;
            }

            #price-container li{
                margin: 0px 0px 13px 0px;
            }

            button{
                border: 2px solid #bdc3c7;
                border-radius: 2px;
                padding: 10px;
                background-color: #fcfcfc;
                font-family: 'Karla',Arial, Helvetica, sans-serif;
                color: #bdc3c7;
                font-weight: 500;
            }
        `
    }

    static get properties() {
        return { 
          brands: {
              type:Array
          },
          colors:{
            type:Array
          },
          prices:{
              type:Array
          },
          key:{
              type:Number
          }
        };
    }

    set brands(brands){
        if(!brands){
            console.error("Brands cannot be null");
            return;
        }

        console.log("set brands: ", brands)
        this._brands = brands;

        this.key = Math.random();
    }

    saveHandler(filter, type){
        let that = this;
        return function(){
            that.saveFilter(filter, type);
        }
    }

    saveFilter(filter, type){
        console.log("Calling saveFilter: ", filter, type);
        const filterToSave = {
            id:filter.id,
            label:filter.label,
            type:type,
            attribute:filter.attribute,
            value:filter.value
        }

        this.api.saveFilter(filterToSave);
    }


    render() {
        return html `
            <div class="container" .id="${this.key}">
                <h2 class="title"> Refine by</h3>
                <div id="brand-container">
                    <h3 class="title">MARCA</h3>
                    ${ this._brands.map(brand => {
                        return html`
                            <div >
                                <input type="checkbox" id="${brand.id}" @click="${this.saveHandler(brand,"BRAND")}"/>
                                <label for="${brand.id}"> ${brand.label}</label>
                            </div>
                        `
                    })}
                </div>
                <div id="color-container">
                    <h3 class="title">CORES</h3>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div id="price-container">
                    <h3 class="title">VALOR</h3>
                    <ul>
                        <li>Abaixo de R$25</li>
                        <li>R$25 à R$50</li>
                        <li>R$50 à R$100</li>
                        <li>R$100 à R$200</li>
                        <li>Acima de R$200</li>
                    </ul>
                </div>
                <button class="primary-action"> LIMPAR FILTROS</button>
            </div>
        `;
    }
}

customElements.define("filters-element",Filters)