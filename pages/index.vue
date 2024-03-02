<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import {
  type DatatableColumn,
  type DatatableData,
  TwButton,
  TwDatatableServer,
  useToast,
} from "vue3-tailwind";

import { useCustomFetch } from "~/composables/useCustomFetch";
import { useAuthStore } from "~/store/auth";

useHead({
  title: "Dashboard | Reportify Admin",
});

const toast = useToast();
const componentKey = ref(0);
const StoreAuth = useAuthStore();
const { userInfo }: any = storeToRefs(StoreAuth);
const resolveBtnDisabled = ref(false);

const forceRerender = () => {
  componentKey.value += 1;
};

const dataTableOpts = {
  column: [
    {
      label: "Description",
      field: "description",
      width: "400px",
      sortable: false,
    },
    {
      label: "Category",
      field: "category",
      width: "400px",
      sortable: false,
    },
    {
      label: "Status",
      field: "status",
      width: "400px",
      sortable: false,
    },
    // {
    //   label: "Location",
    //   field: "location",
    //   width: "400px",
    //   sortable: false,
    // },
    {
      label: "Action",
      field: "action",
      width: "400px",
      sortable: false,
    },
  ] as Array<DatatableColumn>,
  data: [] as Array<DatatableData>,
  limit: 20,
  offset: 0,
  search: "",
  selected: [],
  setting: {
    checkbox: false,
    limitOption: [
      {
        label: "20",
        value: 20,
      },
      {
        label: "50",
        value: 50,
      },
      {
        label: "100",
        value: 100,
      },
    ],
  },
};

const localData = ref(dataTableOpts);

const fetchData = async () => {
  const { data, error, refresh }: any = await useCustomFetch(`/reports`, {
    method: "GET",
    params: {
      limit: localData.value.limit.toString(),
      skip: localData.value.offset.toString(),
    },
  });

  const responseData = data.value.data;

  return {
    data: responseData["results"],
    totalData: responseData["count"],
  };
};

const resolveReport = async (id: string) => {
  resolveBtnDisabled.value = true;

  try {
    const { data, error, refresh }: any = await useCustomFetch(
      `/reports/${id}/resolve`,
      {
        method: "POST",
      }
    );

    if (data.value) {
      toast.success({
        message: "Report has been resolved successfully.",
        lifetime: 2000,
      });
    }

    forceRerender();
  } catch (error) {
    toast.error({
      message: "Something went wrong.",
      lifetime: 2000,
    });
  }

  resolveBtnDisabled.value = false;
};
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold">
      {{ userInfo.admin_category.name }} Reports
    </h2>
    <hr class="my-2 border dark:border-gray-700" />

    <TwDatatableServer
      :fetch-data="fetchData"
      v-model:limit="localData.limit"
      v-model:offset="localData.offset"
      :column="localData.column"
      :setting="localData.setting"
      :key=componentKey
    >
      <template #row="{ column, data }">
        <template v-if="column.field === 'description'">
          {{ data.description }}
        </template>
        <template v-if="column.field === 'category'">
          {{ data.category.name }}
        </template>
        <template v-if="column.field === 'status'">
          <span class="capitalize">{{ data.status }}</span>
        </template>
        <!-- <template v-if="column.field === 'location'">
          <span class="capitalize">{{ data.location }}</span>
        </template> -->

        <template v-if="column.field === 'action'">
          <div class="flex gap-2 justify-center">
            <TwButton
              @click="resolveReport(data.id)"
              :disabled="resolveBtnDisabled"
              variant="success"
              class="border border-gray-900"
              v-if="data.status !== 'resolved'"
            >
              Resolve
            </TwButton>
          </div>
          <div class="flex gap-2 justify-center">
            <TwButton
              :disabled="true"
              variant="success"
              class="border border-gray-900"
              v-if="data.status === 'resolved'"
            >
              Resolved
            </TwButton>
          </div>
        </template>
      </template>

      <template #empty>
        <div class="bg-white dark:bg-gray-800 text-center w-full" v-if="componentKey === 0">No {{ userInfo.admin_category.name }} reports.</div>
        <div class="bg-white dark:bg-gray-800 text-center w-full" v-if="componentKey > 0">Please wait...</div>
      </template>
    </TwDatatableServer>
  </div>
</template>
