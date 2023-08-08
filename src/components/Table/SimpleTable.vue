<template>
  <table class="table table-zebra">
    <thead>
      <th v-for="(column, idx) in columns" :key="idx">
        {{ typeof column === `string` ? column.toLocaleUpperCase() : column.label }}
      </th>
    </thead>
    <tbody>
      <tr v-for="(row, i) in rows" :key="i">
        <td v-for="(column, idx) in columns" :key="idx">
          <slot :name="column.key" :row="row" :column="column">
            {{ format(getValue(row, column), column.formatter) }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
export default {
  name: 'SimpleTable',
  props: {
    columns: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    }
  },
  methods: {
    format(value, formatter) {
      if (typeof formatter === `function`) {
        return formatter(value)
      }
      return value
    },
    getValue(row, column) {
      if (typeof column === `string`) {
        return row[column]
      }
      return row[column.key]
    }
  }
}
</script>