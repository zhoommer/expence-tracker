<template>
  <v-card flat :class="$vuetify.display.mobile ? null : 'pa-5 border'" :max-height="$vuetify.display.mobile ? '' : '70dvh'">
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-cash"></v-icon> &nbsp; {{ $t("expenses") }}

      <v-spacer></v-spacer>

      <v-select 
        class="mt-6 me-5"
        v-model="currency" 
        item-value="value" 
        item-title="title" 
        density="compact"
        single-line
        flat
        :prepend-inner-icon="currency === 'TRY' ? 'mdi-currency-try' : currency === 'USD' ? 'mdi-currency-usd' : ''"

        :items="[ { title: 'Hepsi', value: '' }, { title: 'TRY', value: 'TRY' }, { title: 'USD', value: 'USD' }]" variant="solo-filled" 
        @update:model-value="updateCurrency">
      </v-select>

      <v-text-field
        v-model="searchQuery"
        density="compact"
        :label="$t('search')"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
        @input="updateSearchQuery"
      ></v-text-field>
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table
      :filter-keys="['name']"
      :headers="headers"
      :items="expenses || []"
      item-value="id"
      :mobile="$vuetify.display.mobile"
      :theme="themeStore.mode"
      hide-default-footer
      height="70dvh"
      hover
    >
      <template v-slot:item.category="{ value }">
        {{ t(value) }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          icon="mdi-delete"
          size="x-small"
          color="red-accent-2"
          variant="tonal"
          @click="showDialog(item.id)"
        >
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" transition="dialog-top-transition" width="auto">
      <v-card
        max-width="400"
        prepend-icon="mdi-delete"
        :text="t('your purchase will be deleted. do you want to continue?')"
        :title="t('delete expense')"
      >
        <template v-slot:actions>
          <v-btn :text="t('cancel')" color="secondary" variant="tonal" @click="dialog = false"></v-btn>
          <v-btn :text="t('ok')" color="danger" variant="tonal" @click="deleteExpense"</v-btn>
        </template>
      </v-card>
    </v-dialog>
  
  </v-card>
  <v-card>
    <div class="d-flex align-center">
      <div class="flex-grow-1">
       <v-pagination
         :color="themeStore.color"
         :model-value="page"
         :length="pageCount"
         size="small"
         rounded="circle"
         @update:model-value="updatePage"
       >
       </v-pagination>
      </div>
      <div class="pe-2">
       <v-select
         :color="themeStore.color"
         :model-value="limit"
         :items="[5, 10, 15]"
         min-width="80"
         variant="underlined"
         @update:model-value="updateLimit"
       ></v-select>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useExpenseTable } from "@/composables/useExpenseTable";
import { ExpenseService } from "@/api/services/expenseService";

import { ThemeStore } from "@/stores/theme/themeStore";
import { AlertStore } from "@/stores/alert/alertStore";

const expenseService = new ExpenseService();
const alertStore = AlertStore();
const dialog = ref<boolean>(false);
const id = ref<number | null>(null);

function showDialog(expenseId: number) {
  dialog.value = true;
  id.value = expenseId;
}

async function deleteExpense() {
  try {
   await expenseService.deleteExpense(id.value);
    alertStore.success({ title: "", text: "Expense deleted successfully" });
  } catch (error) { 
   console.log(error); 
  } finally {
    dialog.value = false;
  }
}


const {
  headers,
  updatePage,
  updateLimit,
  updateSearchQuery,
  updateCurrency,
  expenses,
  page,
  limit,
  pageCount,
  searchQuery,
  currency,
} = useExpenseTable();

const themeStore = ThemeStore();
const { t } = useI18n();
</script>
