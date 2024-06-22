<script setup>
  import { computed, ref, onMounted, watch } from 'vue'
  import { game } from '@/stores/game'
  import GameCard from '@/components/GameCard.vue'
  import DataTable from 'primevue/datatable';
  import InputText from 'primevue/inputtext';
  import InputNumber from 'primevue/inputnumber';
  import InputSwitch from 'primevue/inputswitch';
  import Dialog from 'primevue/dialog';
  import Chips from 'primevue/chips';
  import ConfirmPopup from 'primevue/confirmpopup';
  import Button from 'primevue/button';
  import Column from 'primevue/column';
  import Menubar from 'primevue/menubar';
  import router from '@/router'
  import { useConfirm } from "primevue/useconfirm";
  import PocketBase from 'pocketbase'

  const pb = new PocketBase('http://127.0.0.1:8090');

  const confirm = useConfirm();
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
  const isModalOpen = ref(false)
  const currentEditingCard = ref({})
  const confirm1 = (event, data) => {
    confirm.require({
        target: event.currentTarget,
        message: `Delete '${data.guessAction}' card?`,
        rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
        acceptClass: 'p-button-sm p-button-danger',
        rejectLabel: 'No',
        acceptLabel: 'Yes',
        accept: () => {
          deleteCard(data)
        },
        reject: () => {
        }
    });
  };

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

const addCard = async () => {
  const newCard = await pb.collection('cards').create({
    "guessAction": "testing",
    "isExplicit": false,
    "forbiddenWords": [{"word": 'ball'}, {"word": 'ball'}, {"word": 'ball'} ,{"word": 'ball'}, {"word": 'ball'}],
    "descriptiveHint": "This is a hint"
  });

  await gameStore.fetchCards()

  currentEditingCard.value = gameStore.cards.find(({id}) => newCard.id === id)
  isModalOpen.value = true
}

const deleteCard = async (card) => {
  await pb.collection('cards').delete(card.id);
  gameStore.fetchCards()
}

const updateCard = async (card) => {
  await pb.collection('cards').update(card.id, card);
  gameStore.fetchCards()
}

const editInModal = (card, field) => {
  if (['timesPlayed', 'isExplicit'].includes(field)) return
  currentEditingCard.value = card
  isModalOpen.value = true
}

onMounted(async () => {
  gameStore.fetchCards()
})

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
        <Column
          v-for="col of columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
          :style="{ width: col.width, cursor: 'pointer' }"
        >
          <template #body="{ data, field }" >
            <div v-if="col.field === 'forbiddenWords'" @click='editInModal(data)'>
              <span v-for='(thing, index) in data[field]' :key='thing'>
                {{ thing.word }}
                <span v-if='index < data[field].length - 1' class='seperator'>
                  {{' | '}}
                </span>
              </span>
            </div>
            <div v-else @click='editInModal(data, field)'>
              {{ data[field] }}
            </div>
          </template>
          
          <template v-if="['timesPlayed', 'isExplicit'].includes(col.field)" #editor="{ data, field }">
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
        <Column :header="'Delete'" :style="{ cursor: 'pointer' }">
          <template #body="{ data }" >
            <i @click='confirm1($event, data)' class="ri-delete-bin-line"></i>
          </template>
        </Column>
        <Column :header="'Update'" :style="{ cursor: 'pointer' }">
          <template #body="{ data }" >
            <i @click='updateCard(data)' class="ri-check-line"></i>
          </template>
        </Column>
      </DataTable>

      <div @click='addCard' class="add-card">
        <i  class="ri-add-large-fill"></i>
      </div>
    </div>
    <ConfirmPopup></ConfirmPopup>
    <Dialog v-model:visible="isModalOpen" modal dismissableMask :style="{ width: '17rem' }">
      <template #container>
        <div class="modal-container">
          <div class='description'>
            <GameCard :cardData='currentEditingCard' :isAllowEdit='true' />
          </div>
        </div>
      </template>
    </Dialog>
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

      .seperator {
        color: rgb(199, 199, 199);
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
