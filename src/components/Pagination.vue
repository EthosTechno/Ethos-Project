<template>
    <div class="pagination">
    <span class="header-page" v-show="totalItems > 0"><b>Showing {{isInFirstPage ? '1' : ((currentPage-1)*10)+1}} - {{isInLastPage ? totalItems : (currentPage)*10}} of {{totalItems}} {{ pageName }} </b></span> 
    <ul  v-show="totalPages > 1" >
       
        <li class="pagination-item">
            <button class="pagination-btn" :style="{color:  isInFirstPage ? '#807a7f' : ''  }"  type="button" @click="onClickPreviousPage" :disabled="isInFirstPage">
                <i class="fa fa-angle-left" style="padding-right: 2px;"></i> Prev 
            </button>
        </li>

        <li v-for="page in pages" :key="page.name" class="pagination-item">
            <button class="pagination-btn" type="button" @click="onClickPage(page.name)" :disabled="page.isDisabled"
                :class="{ active: isPageActive(page.name) }">
                {{ page.name }}
            </button>
        </li>

        <li class="pagination-item">
            <button class="pagination-btn" type="button" :style="{color:  isInLastPage ? '#807a7f' : ''  }" @click="onClickNextPage" :disabled="isInLastPage">
                Next  <i class="fa fa-angle-right" style="padding-left: 2px;"></i>
            </button>
        </li>
    </ul>
</div>
</template>
  
<script>


export default { 

    // eslint-disable-next-line vue/multi-word-component-names
    name : 'Pagination',
    props: {
        maxVisibleButtons: {
            type: Number,
            default: 3
        },
        totalPages: {
            type: Number,
            required: true
        },
        perPage: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        },
        totalItems: {
            type: Number,
            required: true
        },
        pageName: {
            type: String,
            required: true
        },
    },

    computed: {
        startPage() {
            if (this.currentPage === 1 || this.currentPage === 2 || this.currentPage === 3   ) {
                return 1;
            }
             
            if(this.currentPage === (this.totalPages - 1)) {
                
                return this.currentPage - 2 ;
              
            }
            if (this.currentPage === this.totalPages) {
                return this.totalPages - this.maxVisibleButtons;
            }
          
            return this.currentPage - 1;
        },
        pages() {
            const range = [];
            
            for (
                let i = this.startPage;
                i <= Math.min(this.startPage + this.maxVisibleButtons, this.totalPages);
                i++
            ) {
                range.push({
                    name: i,
                    isDisabled: i === this.currentPage
                });
            }

            return range;
        },
        isInFirstPage() {
            return this.currentPage === 1;
        },
        isInLastPage() {
            return this.currentPage === this.totalPages;
        },
    },
    methods: {
        onClickFirstPage() {
            this.$emit('pagechanged', 1);
        },
        onClickPreviousPage() {
            this.$emit('pagechanged', this.currentPage - 1);
        },
        onClickPage(page) {
            this.$emit('pagechanged', page);
        },
        onClickNextPage() {
            this.$emit('pagechanged', this.currentPage + 1);
        },
        onClickLastPage() {
            this.$emit('pagechanged', this.totalPages);
        },
        isPageActive(page) {
            return this.currentPage === page;
        }
    }
};
</script>
<style>

.pagination {
    list-style-type: none;
    padding: 15px 0 15px 0;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.pagination-item {
    display: inline-block;
    padding-left: 14px
}
.pagination .header-page{
    font-size: 14px;
}

.pagination-btn {
    font-size: 14px;
    padding: 1px 8px;
    height: 25px;
    width: auto;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
}
.pagination-item:first-child .pagination-btn, .pagination-item:last-child .pagination-btn {
    height: auto;
    width: auto;
}
.active {
    background-color: #44ea9f;
    color: #ffffff;
}
</style>