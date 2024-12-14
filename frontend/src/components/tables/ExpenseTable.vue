<template>
  <v-card flat :class="$vuetify.display.mobile ? null : 'pa-5'">
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-cash"></v-icon> &nbsp; {{ $t("expenses") }}

      <v-spacer></v-spacer>

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
      v-model="selectedExpenses"
      :filter-keys="['name']"
      :headers="headers"
      :items="expenses || []"
      item-value="id"
      :mobile="$vuetify.display.mobile"
      :theme="themeStore.mode"
      return-object
      show-select
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
          @click="deleteDialogStore.showDialog(item.id)"
        >
        </v-btn>
      </template>

      <template v-slot:bottom>
        <div class="d-flex">
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
      </template>
    </v-data-table>

    <v-dialog v-model="deleteDialogStore.dialog" width="auto">
      <v-card
        max-width="400"
        prepend-icon="mdi-delete"
        text="Your purchase will be deleted. Do you want to continue?"
        title="Delete Expense"
      >
        <template v-slot:actions>
          <v-btn text="Cancel" color="secondary" variant="tonal" @click="deleteDialogStore.closeDialog"></v-btn>
          <v-btn text="Ok" color="danger" variant="tonal" @click="deleteDialogStore.delete"</v-btn>
        </template>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/stores/theme/useThemeStore";
import { useI18n } from "vue-i18n";
import { useExpenseTable } from "@/hooks/useExpenseTable";
import { useDeleteDialogStore } from "@/stores/expense/useDeleteDialogStore";

const deleteDialogStore = useDeleteDialogStore();

const {
  headers,
  selectedExpenses,
  updatePage,
  updateLimit,
  updateSearchQuery,
  expenses,
  page,
  limit,
  pageCount,
  searchQuery,
} = useExpenseTable();

const themeStore = useThemeStore();
const { t } = useI18n();
</script>
