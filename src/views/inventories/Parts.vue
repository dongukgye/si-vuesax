<template>
  <vs-row vs-justify="center">
    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      vs-lg="12"
      vs-xs="12"
    >
      <vs-card>
        <vs-table
          @search="handleSearch"
          @change-page="handleChangePage"
          @sort="handleSort"
          v-model="selected"
          pagination
          max-items="10"
          search
          multiple
          hoverFlat
          :data="tableItems"
        >
          <template slot="thead">
            <vs-th>
              Name
            </vs-th>

            <vs-th sort-key="spec">
              Spec
            </vs-th>

            <vs-th sort-key="serial">
              Serial
            </vs-th>

            <vs-th sort-key="quantity">
              Quantity
            </vs-th>

            <vs-th sort-key="ideal_quantity">
              Ideal quantity
            </vs-th>

            <vs-th sort-key="order_quantity">
              Order quantity
            </vs-th>

            <vs-th sort-key="category">
              Category
            </vs-th>

            <vs-th sort-key="desc">
              Description
            </vs-th>
          </template>

          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.name">
                {{ tr.name }}
              </vs-td>

              <vs-td :data="tr.spec">
                {{ tr.spec }}
              </vs-td>

              <vs-td :data="tr.serial">
                {{ tr.serial }}
              </vs-td>

              <vs-td :data="tr.quantity">
                {{ tr.quantity }}

                <template slot="edit">
                  <vs-input-number v-model="tr.quantity" />
                </template>
              </vs-td>

              <vs-td :data="tr.ideal_quantity">
                {{ tr.ideal_quantity }}
              </vs-td>

              <vs-td :data="tr.order_quantity">
                {{ tr.order_quantity }}
              </vs-td>

              <vs-td :data="tr.category">
                {{ tr.category }}
              </vs-td>

              <vs-td :data="tr.desc">
                {{ tr.desc }}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
import InventoryDataService from "@/services/data/inventory";

export default {
  data() {
    return {
      selected: [],
      totalItems: 0,
      tableItems: [],
      tableHeaders: [
        {
          text: "Name",
          value: "name",
        },
        {
          text: "규격",
          value: "spec",
        },
        {
          text: "품번",
          value: "serial",
        },
        {
          text: "현재 수량",
          value: "quantity",
        },
        {
          text: "설정 수량",
          value: "ideal_quantity",
        },
        {
          text: "기본 발주 수량",
          value: "order_quantity",
        },
        {
          text: "분류",
          value: "category",
        },
        {
          text: "설명",
          value: "description",
        },
      ],
    };
  },

  watch: {
    "tableItems.quantity": function(val, old) {
      /* eslint-disable no-console */
      console.log(val);
      console.log(old);
    },
  },

  mounted() {
    InventoryDataService.getPartList({}).then((resp) => {
      this.tableItems = resp;
      // this.totalItems = resp.count;
    });
  },

  methods: {
    handleSearch() {},
    handleChangePage() {},
    handleSort() {},
  },
};
</script>

<style lang="scss" scoped></style>
