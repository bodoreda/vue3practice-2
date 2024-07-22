<script>
export default {
  data() {
    //변수생성
    return {
      requestBody: this.$route.query,
      idx: this.$route.query.idx,

      title: '',
      creaId: '',
      contents: '',
      creaDtm: ''
    }
  },
  mounted() {
    this.fnGetView()
  },
  methods: {
    fnGetView() {
      if (this.idx !== undefined) {
        this.$axios
          .get(this.$serverUrl + '/board/api/detail/' + this.idx, {
            params: this.requestBody
          })
          .then((res) => {
            this.title = res.data.detail.title
            this.creaId = res.dat.detail.creaId
            this.contents = res.data.detail.contents
            this.creaDtm = res.data.detail.creaDtm
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    fnList() {
      console.log('')
      delete this.requestBody.idx
      this.$router.push({
        path: '/board/list',
        query: this.requestBody
      })
    },
    fnView(idx) {
      this.requestBody.idx = idx
      this.$router.push({
        path: '/board/detail',
        query: this.requestBody
      })
    },
    fnSave() {
      let apiUrl = this.$serverUrl + '/board/api/detail'
      this.form = {
        idx: this.idx,
        title: this.title,
        contents: this.contents,
        creaId: this.creaId
      }
      const data = new FormData()
      const json = JSON.stringify(this.form)
      const blob = new Blob([json], { type: 'application/json' })

      data.append('document', blob)
      if (this.idx === undefined) {
        //INSERT
        this.$axios
          .post(apiUrl, data, {
            headers: { 'content-Type': 'multipart/form-data' }
          })
          .then((res) => {
            alert('글이 저장되었습니다.')
            this.fnView(res.data.idx)
          })
          .catch((err) => {
            if (err.message.indexOf('Network Error') > -1) {
              alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
            }
          })
      } else {
        //UPDATE
        this.$axios
          .post(apiUrl + '/' + this.idx, data, {
            headers: { 'content-Type': 'multipart/form-data' }
          })
          .then((res) => {
            alert('글이 저장되었습니다.')
            this.fnView(res.data.idx)
          })
          .catch((err) => {
            if (err.message.indexOf('Network Error') > -1) {
              alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
            }
          })
      }
    }
  }
}
</script>
<style scoped></style>

<template>
  <div class="board-detail">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave">저장</button
      >&nbsp;
      <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
    </div>
    <div class="board-contents">
      <input
        type="text"
        v-model="title"
        class="w3-input w3-border"
        placeholder="제목을 입력해주세요."
      />
      <input
        type="text"
        v-model="creaId"
        class="w3-input w3-border"
        placeholder="작성자를 입력해주세요."
        v-if="idx === undefined"
      />
    </div>
    <div class="board-contents">
      <textarea
        id=""
        cols="30"
        rows="10"
        v-model="contents"
        class="w3-input w3-border"
        style="resize: none"
      >
      </textarea>
    </div>
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave">저장</button
      >&nbsp;
      <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
    </div>
  </div>
</template>
