<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      type="button"
      class="inline-flex justify-between items-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
    >
      {{ selectedOption ? selectedOption.label : placeholder }}
      <svg class="-mr-1 ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M10 12l-6-6v8a1 1 0 0 0 1.7.7l3.3-3.29 3.3 3.3a1 1 0 0 0 1.4 0 1 1 0 0 0 0-1.42L10 12z"
        />
      </svg>
    </button>
    <ul
      v-if="isOpen"
      class="absolute z-10 mt-2 w-full bg-white shadow-lg max-h-56 rounded-md overflow-auto border border-gray-300"
    >
      <li
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
        class="cursor-pointer select-none relative py-2 pl-3 pr-9 text-gray-900 hover:bg-gray-100"
      >
        <span class="block truncate">{{ option.label }}</span>
        <span
          v-if="selectedOption && selectedOption.value === option.value"
          class="absolute inset-y-0 right-0 flex items-center pr-4"
        >
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { ref } from 'vue';

interface Option {
  value: string | number;
  label: string;
}

export default {
  props: {
    options: {
      type: Array as PropType<Option[]>,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Select an option'
    }
  },
  setup(props, { emit }) {
    const isOpen = ref(false);
    const selectedOption = ref<Option | null>(null);

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    const selectOption = (option: Option) => {
      selectedOption.value = option;
      isOpen.value = false;
      emit('option-selected', option);
    };

    return { isOpen, selectedOption, toggleDropdown, selectOption };
  }
};
</script>
