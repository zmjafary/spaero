<template>
  <ion-button :class="hasGradient ? 'has-gradient' : ''" :color="color" :fill="btnFill" :expand="expand" @click="callAction">
    <i :class="icon" v-if="icon"></i>
    {{ btnText }}
  </ion-button>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import { PropType } from 'vue';
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  btnText: String,
  url: String,
  color: String,
  btnFill: {
    type: String as PropType<'clear' | 'default' | 'outline' | 'solid' | undefined>,
    required: false,
  },
  icon: String,
  type: String,
  expand: {
    type: String as PropType<'block' | 'full' | undefined>,
    required: false,
  },
  hasGradient: Boolean,
  callback: {
    type: Function as PropType<(event?: Event) => void>,  // Make the event parameter optional
    required: false,
  }
});

const callAction = () => {
  if(typeof props.url != "undefined"){
    router.push(props.url); //make this ionic router something or other
  } else if(props.callback != null){
    props.callback();
  }
};

</script>

<style>
  ion-button{
    font-family: var(--base-font);
    --border-radius: var(--radius);
  }

  ion-button.has-gradient{
    --from-color: var(--ion-color-primary);
    --to-color: var(--ion-color-primary-shade);
    --ion-color-base: linear-gradient(to bottom, var(--from-color) 0%, var(--to-color) 100%) !important;
  }

  ion-button.ion-color-primary{
    --from-color: var(--ion-color-primary);
    --to-color: var(--ion-color-primary-shade);
  }

  ion-button.ion-color-secondary{
    --to-color: var(--ion-color-secondary);
    --from-color: var(--ion-color-secondary-shade);
  }

  ion-button.ion-color-secondary.button-outline{
    --border-color: var(--ion-color-secondary);
    --background: var(--ion-color-secondary-contrast);
  }

    ion-button.ion-color-secondary.button-outline::part(native){
      background: var(--ion-color-secondary-contrast);
    }

  ion-button.ion-color-secondary.button-clear{
    --color: var(--ion-color-secondary);
  }

  ion-button.ion-color-light{
    --border-color: #fff;
    --color: #fff;
  }

  ion-button.ion-color-tertiary.button-outline{
    --border-color: var(--ion-color-tertiary);
    --background: var(--ion-color-tertiary-contrast);
  }

    ion-button.ion-color-tertiary.button-outline::part(native){
      background: var(--ion-color-tertiary-contrast);
    }

  ion-button i{
    margin-right: 10px;
  }

</style>