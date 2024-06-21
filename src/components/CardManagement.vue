<script setup>
  import { computed, ref, onMounted, watch } from 'vue'
  import { game } from '@/stores/game'
  import DataTable from 'primevue/datatable';
  import InputText from 'primevue/inputtext';
  import InputNumber from 'primevue/inputnumber';
  import InputSwitch from 'primevue/inputswitch';
  import Chips from 'primevue/chips';
  import Column from 'primevue/column';
  import Menubar from 'primevue/menubar';
  import router from '@/router'
  
  const gameStore = game()
  const products = ref();
  const columns = ref([
    { field: 'id', header: 'ID', width: '3%' },
    { field: 'guessAction', header: 'Action' },
    { field: 'forbiddenWords', header: 'Forbidden Words' },
    { field: 'descriptiveHint', header: 'Hint' },
    { field: 'timesPlayed', header: 'Played' },
    { field: 'isExplicit', header: 'isExplicit' }
  ]);

  const items = ref([
    {
      label: 'Cards',
      icon: 'pi pi-home'
    },
    {
      label: 'Categories',
      icon: 'pi pi-search',
      items: [
        {
          label: 'Family',
          icon: 'pi pi-pencil'
        },
        {
          label: 'Sports',
          icon: 'pi pi-palette',
        }
      ]
    },
    {
      label: 'Back To Game',
      icon: 'pi pi-envelope',
      command: () => router.push('/')
    },
    {
      label: 'Help',
      icon: 'pi pi-envelope'
    }
]);

const onCellEditComplete = (event) => {
  let { data, newValue, field } = event;
  data[field] = newValue
};

const addCard = () => {
  gameStore.cards.push({
    id: 8,
    guessAction: 'action',
    forbiddenWords: ['word'],
    descriptiveHint: 'hint',
    timesPlayed: 0,
    isExplicit: false
  })
}

</script>

<template>
  <div class="card-management-container">
    <Menubar :model="items" />

    <div class="table-container">
      <DataTable
        :value="gameStore.cards"
        resizableColumns
        columnResizeMode="fit"
        editMode="cell"
        showGridlines
        @cell-edit-complete="onCellEditComplete"
        :pt="{
          table: { style: 'table-layout: auto' },
          column: {
            bodycell: ({ state }) => ({
                class: [{ 'editing': state['d_editing'] }]
            })
          }
        }"
      >
        <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" :style="{ width: col.width }">
          <template #body="{ data, field }">
            {{ data[field] }}
          </template>
          <template v-if="col.field !== 'id'" #editor="{ data, field }">
            <template v-if="field === 'timesPlayed'">
              <InputNumber v-model="data[field]" showButtons autofocus buttonLayout="horizontal" inputStyle="width: 3rem" :min="0" :max="99" />
            </template>
            <template v-else-if="field === 'isExplicit'">
              <InputSwitch v-model="data[field]" />
            </template>
            <template v-else-if="field === 'forbiddenWords'">
              <Chips v-model="data[field]" :allowDuplicate='false' separator=',' :max='5' />
            </template>
            <template v-else>
              <InputText v-model="data[field]" autofocus />
            </template>
          </template>
        </Column>
      </DataTable>

      <div @click='addCard' class="add-card">
        <i  class="ri-add-large-fill"></i>
      </div>
    </div>

  </div>
</template>

<style lang="scss">
  .card-management-container {
    .table-container {

      .editing {
        padding-top: 0;
        padding-bottom: 0;
      }
    }
  }
</style>
<style scoped lang="scss">
  .card-management-container {
    min-height: 100vh;
    background: rgb(221, 221, 221);
    padding: 50px 50px 200px;

    .table-container {
      margin-top: 100px;

      .add-card {
        background: #1eb369;
        padding: 10px;
        border: 1px solid #e2e8f0;
        border-top: 0;
        font-size: 20px;
        text-align: center;
        color: white;
        cursor: pointer;
      }
    }

    @media(max-width: 500px) {
      padding: 0;

      .table-container {
        margin-top: 10px;
      }
    }
  }
</style>
