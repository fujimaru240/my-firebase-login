<template>
  <div class="all">
    <h1>secret</h1>
    <div>
      <h2>Heros</h2>
      <div>
        <h3>New data</h3>
        <div class="cp_iptxt">
          <form @submit.prevent="addHero">
            <input type="text" placeholder="No" v-model="inputId" />
            <input type="text" placeholder="Comic" v-model="inputComic" />
            <input type="text" placeholder="Name" v-model="inputName" />
            <input type="text" placeholder="Place" v-model="inputPlace" />
            <input type="submit" value="Add"/>
          </form>
        </div>
      </div>
      <div>
        <h3>List</h3>
        <table class="table5">
          <thead>
            <tr>
              <th>No</th>
              <th>Comic</th>
              <th>Name</th>
              <th>Place</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in datas" v-bind:key="data.id">
              <td>{{data.id}}</td>
              <td>{{data.comic}}</td>
              <td>{{data.name}}</td>
              <td>{{data.place}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from '../plugins/firebase';
import Hero from '../data/Hero';

@Component
export default class Secret extends Vue {
  inputId = ''
  inputComic = ''
  inputName = ''
  inputPlace = ''
  inputTeams = ''
  datas: Hero[] = []
  herosRef: any

  mounted() {
    this.herosRef = firebase.firestore().collection('heros');
    this.loadList()
  }

  private addHero(): void {
    console.log('click add')
    const data = {
      seq: this.inputId,
      comic: this.inputComic,
      name: this.inputName,
      place: this.inputPlace
    }
    console.log(data)
    firebase.firestore().collection('heros').doc().set(data);

    this.$router.push('/Secret')
  }

  private loadList() {
    console.log(this.herosRef);
    this.herosRef.get().then((snapshot: any) => {
      snapshot.forEach((doc: any) => {
        const item = doc.data()
        console.log(item)
        const heros: Hero = {
          id: item.seq,
          comic: item.comic,
          name: item.name,
          place: item.place,
          team: item.team
        };
        this.datas.push(heros)
      })
    })
  }

  private reload(): void {
      this.$forceUpdate()
  }
}
</script>

<style>
.all {
  text-align: left;
}
h2 {
  padding: 1rem 2rem;
  border-left: 5px solid #000;
  background: #f4f4f4;
}

h3 {
  position: relative;
  overflow: hidden;
  padding: 0.5rem 2rem 0.25rem 50px;
  border-top: 3px solid rgb(122, 143, 151);
}
h3:before {
  position: absolute;
  top: -150%;
  left: -100px;
  width: 130px;
  height: 300%;
  content: '';
  -webkit-transform: rotate(25deg);
  transform: rotate(25deg);
  background: rgb(89, 103, 109);
}
h3 span {
  font-size: 40px;
  font-size: 4rem;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  display: block;
  padding-top: 3px;
  padding-left: 16px;
  color: #fff;
}

.table5 {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  line-height: 1.5;
  border: 1px solid #ccc;
  font-size: 13px;
}
.table5 th {
  padding: 10px;
  font-weight: bold;
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 2px solid #0099e3;
  background: #cee7ff;
}

.cp_iptxt {
	position: relative;
	width: 50%;
	margin: 20px 3%;
}
.cp_iptxt input[type=text] {
	font: 15px/24px sans-serif;
	box-sizing: border-box;
	width: 100%;
	margin: 2px 0;
	padding: 0.1em;
	transition: 0.3s;
	border: 1px solid #1b2538;
	border-radius: 4px;
	outline: none;
}
.cp_iptxt input[type=text]:focus {
	border-color: #da3c41;
}
.cp_iptxt input[type=text] {
	padding-left: 20px;
}
.cp_iptxt i {
	position: absolute;
	top: 8px;
	left: 0;
	padding: 9px 8px;
	transition: 0.3s;
	color: #aaaaaa;
}
.cp_iptxt input[type=text]:focus + i {
	color: #da3c41;
}
</style>