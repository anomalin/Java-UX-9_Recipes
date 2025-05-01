import { faker } from 'https://jspm.dev/@faker-js/faker';

const TopMenu =  {
    name: "TopMenu",
    data() {
      return {
        searchQuery: ""
      };
    },
    methods: {
      submitSearch() {
        this.$emit("search", this.searchQuery); 
      }
    },
    template: `    
            <div class="topmenu">
                <div>
                    <img src="img/arcticons--rakuten-recipe.svg" alt=""><h1>Receptsök</h1>
                </div>
                <div class="search">
                    <input type="text" v-model="searchQuery" placeholder="Sök..." @keyup.enter="submitSearch" />
                    <button @click="submitSearch">🔍</button>
                    <img src="img/fluent--settings-32-light.svg" alt=""> <img src="img/lets-icons--user-fill.svg" alt="">
                </div>
            </div>
    `
  };

const FilterBar = {
    name: "FilterBar",
    props: ['filters'],
    data () {
        return {
            collapsed: true
        }
    },
    methods: {
        removeFilter(filter) {
            this.$emit('remove-filter', filter);
        }
    },
    template: ` <div class="filterbar">
                <span class="tag" v-for="(filter, index) in filters" :key="index">
                 <button @click="$emit('remove-filter', filter)">{{ filter }}   x</button>
                 </span>
                 </div>`
  }

const FoodCard = {
    name: "FoodCard",
    props: ['categoryTree', 'title'],
    data() {
        return {
            openCategory: null
        };
    },
    methods: {
        toggleCategory(category) {
            this.openCategory = this.openCategory === category ? null : category;
        },
        addFilter(filter) {
            this.$emit('add-filter', filter);
        }
    },
    template: `<div class="food-card">
                <div class="card-name">{{ title }}</div>
                <div class="category-list">
                <div v-for="(subItems, category) in categoryTree" :key="category">
                <button @click="toggleCategory(category)" class="category-button">
                {{ category }}
                </button>
                <div v-if="openCategory === category" class="subcategory-list">
                <button v-for="item in subItems" :key="item" @click="addFilter(item)" class="subcategory-button">{{ item }}</button>
                </div>
                </div>
                </div>
                </div>`
}

const SearchResults = {
    name: "SearchResult", 
    props: {
        results: {
            type: Array, 
            default: null
        }
    },
    template: `<div class="search-results" v-if="results !== null">
                    
                        <div v-for="(result, index) in results" :key="index" class="result-card">
                        <img src="img/korvstroganoff_med_ris.jpg" alt="gryta med korv">
                        <div><h3>{{ result.title }}</h3>
                        <p> {{ result.description }} </p></div>
                        <div class="short-info">
                        <ul><li>10 portioner</li>
                        <li>Glutenfri</li>
                        <li>Medium</li>
                        <li>20 SEK/port</li></ul></div>
                        </div>
                </div>`
}

const SearchFilter = {
    name: "SearchFilter",
    data() {
        return {
            showSortOptions: false,
            selectedSort: "bestMatch",
        };
    },
    methods: {
        toggleSortOptions() {
            this.showSortOptions = !this.showSortOptions;
        }
    },
    template: `<div class="searchfilter">
                <img src="img/gg--list.svg" alt="">
                <img src="img/change-sort-type.png" alt="change sorting" @click="toggleSortOptions" style="cursor: pointer;">
                <p>Bäst matchning</p>
                <p>Rensa sökning</p>
                <div v-if="showSortOptions" class="sort-options">
                <label><input type="radio" value="bestMatch" v-model="selectedSort">Bäst matchning</label>
                <label><input type="radio" value="alphabetical" v-model="selectedSort">Från A-Ö</label>
                <label><input type="radio" value="mostPopular" v-model="selectedSort">Populärast</label>
                </div>
                </div>`
}

const app = Vue.createApp({
    components: {
        'top-menu': TopMenu,
        'filter-bar': FilterBar,
        'food-card': FoodCard,
        'search-results': SearchResults,
        'search-filter': SearchFilter
    },
    data() {
        return {
            selectedFilters: [],
            mainIngredientTree: {
                    "Fågel": ["Kyckling", "Kalkon", "Vaktel"],
                    "Fisk": ["Lax", "Torsk", "Tonfisk", "Hälleflundra", "Sej"],
                    "Kött": ["Fläsk", "Biff", "Lamm", "Ren", "Hjort"]
            },
            vegetableTree: {
                "Rotfrukter": ["Morot", "Rödbeta", "Sparris"]
            },
            mealTypeTree: {
                "Antal rätter": ["Snittar", "Förrätt", "Huvudrätt", "Efterrätt"]
            },
            specialTree: {
                "Allergi": ["Glutenfritt", "Mjölkproteinfritt", "Laktosfritt"],
                "Preferenser": ["Vegetariskt", "Veganskt"]
            },
        
            searchResults: []
        }
    },
    methods: {
        handleSearch(query) {
            this.searchResults = Array.from({length: 5}, () => ( {
                title: faker.commerce.productName(),
                description: faker.lorem.sentence()
            }));
        },
        handleRemoveFilter(filter) {
            this.selectedFilters = this.selectedFilters.filter(f => f !== filter);
        },
        handleAddFilter(filter) {
            if (!this.selectedFilters.includes(filter)) {
                this.selectedFilters.push(filter);
            }
        }
    }
});

app.mount("#app");



// OBS! All JS här är chatGPT:at !

// Select the slider, value display, and slider container
const slider = document.querySelector('input[type="range"]');
const valueDisplay = document.querySelector('.slider-value');

// Function to update the value display and position
function updateSliderValue() {
    const sliderValue = slider.value;
    valueDisplay.textContent = `${sliderValue} kr`;

    // Calculate the new left position of the value display
    const valuePosition = (sliderValue - slider.min) / (slider.max - slider.min) * 100;

    // Position the value display relative to the slider's value
    valueDisplay.style.left = `calc(${valuePosition}% - ${valueDisplay.offsetWidth / 2}px)`; // Center the value display
}

// Update the value display and position when the slider changes
slider.addEventListener('input', updateSliderValue);

// Call the function on page load to set the initial position
document.addEventListener('DOMContentLoaded', updateSliderValue);
