<template>
  <ion-card class="spaero-card" v-if="item">
      <ion-card-header v-if="item.headers && item.headers.best_match" class="spaero-card__header spaero-card__header-match spaero-card__header-match--success">
        <ion-card-title class="spaero-card__title">#1 Best matched <span class="spaero-card__match">{{item.headers.best_match.rating}}%</span></ion-card-title>
      </ion-card-header>

      <ion-card-header class="spaero-card__header" v-if="item.title">
        <ion-card-title class="spaero-card__title">
          {{ item.title }} 
          <span class="spaero-card__danger" v-if="item.isExpired">Expired</span>
          <span class="spaero-card__warning" v-if="item.isOutstanding">Outstanding</span>
          <span class="spaero-card__success" v-if="item.status">{{ item.status }}</span>
        </ion-card-title>
      </ion-card-header>
      <template v-for="body in item.body" v-if="item.body && Object.keys(item.body).length">
        <ion-card-content class="spaero-card__content">
          <ion-grid v-if="body && Object.keys(body).length">
            <template v-for="(value, title, index) in body" :key="index" v-if="body">
              <ion-row v-if="index % 2 === 0">
                <ion-col size="6" v-if="String(title) !== 'links' && String(title) !== 'internal_links'">
                  <ion-label>{{ title }}</ion-label>
                  <p v-if="typeof value === 'string'">{{ value }}</p>
                  <p v-else>
                    <ion-toggle v-model="value.default" @ionChange="value.change"></ion-toggle>
                  </p>
                </ion-col>
                <ion-col size="6" v-if="index + 1 < Object.keys(body).length && String(Object.keys(body)[index + 1]) !== 'links' && body[Object.keys(body)[index + 1]] !== undefined && body[Object.keys(body)[index + 1]] !== null && body[Object.keys(body)[index + 1]] !== ''">
                  <ion-label>{{ Object.keys(body)[index + 1] }}</ion-label>
                  <p>{{ body[Object.keys(body)[index + 1]] }}</p>
                </ion-col>
              </ion-row>
            </template>
          </ion-grid>
          <span v-if="item.headers && item.headers.quoted" class="spaero-card__info">Quoted</span>
          <div class="spaero-card__footer" style="padding-left: 0; padding-right: 0; padding-bottom: 0;" v-if="body.internal_links">
            <template v-for="(link, index) in body.internal_links">
              <Button 
                :btnText="link.link_text" 
                :callback="link.callback" 
                :url="link.link" 
                :icon="link.icon" 
                color="tertiary" 
                fill="outline" 
                expand="block" 
                v-if="!link.type || link.type == 'button'"
              ></Button>
              <HelpTextModal 
                v-if="link.type == 'help'" 
                :link="link" 
                :modalId="`help-modal-${link.random}`"
              ></HelpTextModal>
              <component 
                :is="link.component.type" 
                v-if="link.component && link.type == 'component'" 
                :data="link.component.data" 
              />
            </template>
          </div>
        </ion-card-content>
        <ion-footer class="spaero-card__footer" v-if="body.links">
          <template v-for="(link, index) in body.links" v-if="body.links">
            <Button 
              :btnText="link.link_text" 
              :callback="link.callback" 
              :url="link.link" 
              :icon="link.icon" 
              color="tertiary" 
              fill="outline" 
              expand="block" 
              v-if="!link.type || link.type == 'button'"
            ></Button>
            <HelpTextModal 
                v-if="link.type == 'help'" 
                :link="link" 
                :modalId="`help-modal-${link.random}`"
              ></HelpTextModal>
            <component 
              :is="link.component.type" 
              v-if="link.component && link.type == 'component'" 
              :data="link.component.data" 
            />
          </template>
        </ion-footer>
    </template>
  </ion-card>
</template>

<script setup lang="ts">
  import { IonCard, IonCardContent, IonToggle, IonCardTitle, IonCardHeader, IonGrid, IonLabel, IonCol, IonRow, IonFooter } from '@ionic/vue';
  import { defineProps } from 'vue';
  import HelpTextModal from '../components/HelpTextModal.vue';
  import Button from '../components/Button.vue';

  const props = defineProps({
    item: Object,
    data: Object,
  });

</script>

<style>
.spaero-card{
  margin: 0;
  font-family: var(--base-font);
  background-color: #fff;
  max-width: 655px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

  .spaero-card__header{
    border-bottom: 1px solid rgba(27, 51, 71, 0.1);
    padding: 15px;
  }

    .spaero-card__header-match{
      background-color: #8CACC5;
      padding: 5px 15px;
    }

      .spaero-card__header-match--success{
        background-color: var(--ion-color-success);
      }

      .spaero-card__header-match .spaero-card__title{
        font-weight: 400;
        color: #fff;
        display: flex;
        font-size: 1rem;
      }

        .spaero-card__header-match .spaero-card__title span{
          font-weight: 600;
        }

  .spaero-card__title{
    font-size: 0.9375rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    line-height: 2em;
  }

  .spaero-card__success, .spaero-card__danger, .spaero-card__info, .spaero-card__warning{
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: -0.24px;
    line-height: 1.2em;
    padding: 5px 10px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .spaero-card__success{
    color: rgba(50, 147, 111, 1);
    background-color: rgba(50, 147, 111, 0.1);
  }

  .spaero-card__danger{
    background-color: rgba(237, 30, 36, 0.1);
    color: rgba(237, 30, 36, 1);
  }

  .spaero-card__info{
    background-color:rgba(68, 119, 161, 0.1);
    color: rgba(68, 119, 161, 1);
    padding: 7px 10px;
  }

  .spaero-card__warning{
    background-color: rgba(247, 152, 36, 0.1);
    color: #F79824;
  }

  .spaero-card__buttons{
    align-items: center;
    gap: 10px;
    display: flex;
  }

    .spaero-card__buttons ion-button, .spaero-card__footer ion-button{
      font-size: 0.8125rem;
      margin: 0;
      --border-radius: var(--radius);
    }

    .spaero-card__buttons .button-outline::part(native){
      border-color: rgba(27, 51, 71, 0.1);
    }

  .spaero-card__footer{
    border-top: 1px solid rgba(27, 51, 71, 0.1);
    display: flex;
    flex-direction: row;
    gap: 18px;
    padding: 15px;
    margin-top: auto;
  }

    .spaero-card__footer ion-button{
      width: 100%;
    }

  .spaero-card__content{
    padding: 15px !important;
  }

    .spaero-card__content ion-label{
      color: rgba(0, 0, 0, 0.5);
      font-size: 0.8125rem;
      margin: 0 0 7px;
    }

    .spaero-card__content ion-label + p{
      font-weight: 600;
      color: #000;
      font-size: 0.875rem;
      margin: 0 0 12px;
    }

    ion-grid {
    --ion-grid-padding: 0;
  }

    ion-row{
      gap: 12px 0;
    }

</style>
