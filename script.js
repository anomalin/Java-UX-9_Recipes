import { faker } from 'https://jspm.dev/@faker-js/faker';

const TopMenu = {
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
                    <img src="img/Group_18.png" alt=""><h1>Receptsök</h1>
                </div>
                <div class="search">
                    <input type="text" v-model="searchQuery" placeholder="Sök..." @keyup.enter="submitSearch" />
                    <button @click="submitSearch">🔍</button>
                    <img src="img/group.png" alt="settings icon">

                <img src="img/ei_user.png" alt="user icon">
                </div>
            </div>
    `
};

const FilterBar = {
    name: "FilterBar",
    props: ['filters'],
    data() {
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
                 <button @click="$emit('remove-filter', filter)">{{ filter }}   X</button>
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
  <div class="button-container">
  <div v-else class="category-list">
    <!-- Alla kategoriknappar visas först -->
    <div class="category-buttons">
      <button
        v-for="(subItems, category) in categoryTree"
        :key="category"
        @click="toggleCategory(category)"
        class="category-button"
      >
        {{ category }}
        <img src="img/ic--twotone-plus.svg" alt="add">
      </button>
    </div>
    <div v-if="openCategory" class="subcategory-list">
      <button
        v-for="item in categoryTree[openCategory]"
        :key="item"
        @click="addFilter(item)"
        class="subcategory-button">
        {{ item }}
      </button>
    </div>
    </div>
  </div>
</div>
`
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
                        <div class="top">
                        <div class="to-left"><img src="img/korvstroganoff_med_ris.jpg" alt="gryta med korv">
                        <div><h3>{{ result.title }}</h3>
                        <p> {{ result.description }} </p></div></div>
                        <div class="to-right">
                        <div class="short-info">
                        <ul><li>10 portioner</li>
                        <li>Glutenfri</li>
                        <li>Medium</li>
                        <li>20 SEK/port</li></ul></div>
                        <input type="checkbox" name="save">
                        </div></div>
                        <div class="bottom">
                        <p>Tillagningstid: 30 min</p>
                        <p>Komplexitet: Medium</p>
                        </div>
                        </div>
                </div>`
}

const SearchFilter = {
    name: "SearchFilter",
    data() {
        return {
            showSortOptions: false,
            selectedSort: "bestMatch",
            sortLabels: {
                bestMatch: "Bäst matchning",
                alphabetical: "Från A-Ö",
                mostPopular: "Populärast"
            }
        };
    },
    methods: {
        toggleSortOptions() {
            this.showSortOptions = !this.showSortOptions;
        }
    },
    template: `<div class="searchfilter">
                <div class="sorting">
                <img src="img/material-symbols-light_table-rows@2x.png" alt="view">
                <img src="img/change-sort-type.png" alt="change sorting" @click="toggleSortOptions" style="cursor: pointer;">
                <p>{{ sortLabels[selectedSort] }}</p>
                </div>
                
                <div class="clear-text">
                <p @click="$emit('clear-search')" style="cursor: pointer;">Rensa sökning</p></div>
                <div v-if="showSortOptions" class="sort-options">
                <label><input type="radio" value="bestMatch" v-model="selectedSort">Bäst matchning</label>
                <label><input type="radio" value="alphabetical" v-model="selectedSort">Från A-Ö</label>
                <label><input type="radio" value="mostPopular" v-model="selectedSort">Populärast</label>
                </div>
                </div>
                </div>`
}

const OptionSection = {
    name:  "OptionSection",
    data() {
        return {
            selectedOptions: {
                adaptable: false,
                filterRecipes: false
            },
            numberOfSteps: "",
        };
    },
    methods: {
        submitOptionSearch() {
            this.$emit("option-section", {
                adaptable: this.selectedOptions.adaptable,
                filterRecipes: this.selectedOptions.filterRecipes,
                steps: this.numberOfSteps
            });
            this.$emit("search", "");
        },
        clearOptionFilters() {
            this.selectedOptions.adaptable = false;
            this.selectedOptions.filterRecipes = false;
            this.numberOfSteps = "";
            this.$emit("clear-option-filters");
        }
    },
    template: `<div class="option-section">
                
                <label>Anpassningsbar<input type="checkbox" v-model="selectedOptions.adaptable">
                <div class="popup">Kryssa i för att visa recept som kan anpassas enligt vald specialkost. T.ex. byta ut en ingrediens.</div></label>
                <label>Visa endast recept som innehåller alla valda filter<input type="checkbox" v-model="selectedOptions.filterRecipes"></label>
                
                
                <div class="step"><label for="steps">Antal moment: </label>
                <select id="steps" v-model="numberOfSteps">
                <option value="">Välj</option>
                <option value="few">1-5</option>
                <option value="medium">5-10</option>
                <option value="many">10+</option>
                </select></div>
                
                <div class="option-buttons">
                <button @click="clearOptionFilters">Rensa filter</button>
                <button @click="submitOptionSearch">Sök</button>
                </div>
                </div>`

}

const app = Vue.createApp({
    components: {
        'top-menu': TopMenu,
        'filter-bar': FilterBar,
        'food-card': FoodCard,
        'search-results': SearchResults,
        'search-filter': SearchFilter,
        'option-section': OptionSection
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
            chefTree: {
                "Förberedelse": ["Går att förbereda dagen innan", "Går att frysa in"]
            },
            worldFoodTree: {
                "Asiatiskt": ["Östasiatiskt", "Indiskt"],
                "Europeiskt": ["Italienskt", "Franskt", "Spanskt", "Svenskt"]
            },

            searchResults: []
        }
    },
    methods: {
        handleSearch(query, options) {
            this.searchResults = Array.from({ length: 5 }, () => ({
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
        },
        handleClearSearch() {
            this.searchResults = [];
            this.selectedFilters = [];
        },
        clearOptionfilters() {
            this.clearOptionfilters();
        }
    }
});

app.mount("#app");

