<template>
  <div class="card">
    <div class="input-wrapper">
      <textarea ref="textareaEl" />
      <button @click="handleUpdateGrid">Update grid</button>
    </div>

    <div class="table-wrapper">
      <table v-if="gridData && gridData.length">
        <tr v-for="(row, index1) in gridData" :key="index1">
          <td v-for="(element, index2) in row" :key="index2">{{ element }}</td>
        </tr>
      </table>
      <button
        @click="handleCalculateMinimumCost"
        :disabled="disableCalculateMinimumCostButton"
      >
        Calculate Minimum Cost
      </button>
    </div>

    <p v-if="result" class="result-paragraph">
      Minimum cost: <span class="result-data">{{ result }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
  import { minCostPath } from "../../helpers";
  import { ref, computed } from "vue";

  const textareaEl = ref<HTMLTextAreaElement>();

  const result = ref<number | null>(null);

  const gridData = ref<number[][]>([]);

  const handleUpdateGrid = () => {
    const grid = textareaEl.value?.value;

    if (!grid) return;

    if (result.value) result.value = null;

    const parsedData = JSON.parse(grid);

    if (
      Array.isArray(parsedData) &&
      Array.isArray(parsedData[0]) &&
      parsedData[0].length === parsedData.length
    )
      gridData.value = parsedData;
  };

  const disableCalculateMinimumCostButton = computed(
    () => !gridData.value || !gridData.value.length
  );

  const handleCalculateMinimumCost = () => {
    const res = minCostPath(gridData.value);

    result.value = res;
  };
</script>

<style lang="css" scoped>
  .card {
    --white: #fff;
    --gray: #eaeaea;
    --gray-8f: #eaeaea8f;

    min-width: 420px;
    border-radius: 8px;
    background-color: var(--white);
    padding: 16px 24px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .card button,
  .card textarea {
    border-radius: 4px;
    padding: 2px 8px;
    border: 1px solid var(--gray);
    background-color: var(--white);
  }

  .card button {
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .card button:hover {
    background-color: var(--gray-8f);
  }

  .card button:disabled {
    cursor: not-allowed;
    background-color: var(--gray-8f);
  }

  .card textarea {
    width: 100%;
    min-height: 96px;
  }

  .input-wrapper,
  .table-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }

  .table-wrapper table {
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid var(--gray);
    border-collapse: collapse;
    border-radius: 4px;
  }

  .table-wrapper tr {
    display: flex;
  }

  .table-wrapper td {
    box-sizing: border-box;
    flex: 1;
    padding: 12px 24px;

    border: 1px solid var(--gray);
    text-align: center;
    vertical-align: middle;
  }

  .result-paragraph {
    align-self: center;
  }

  .result-paragraph span {
    font-weight: bold;
  }
</style>
