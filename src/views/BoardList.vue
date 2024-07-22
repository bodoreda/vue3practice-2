<template>
  <div style="padding: 8px; margin: 8px; border: 1px solid blue;">
    <select v-model="searchIndex" style="height: 30px; margin-right: 10px;">
      <option disabled value="">선택</option>
      <option value="idx">글번호</option>
      <option value="title">제목</option>
      <option value="content">내용</option>
    </select>
    <input type="text" v-model="searchText" style="height: 30px; margin-right: 10px;"/>
    <button @click="fnSearch" style="height: 30px; margin-right: 10px;">검색</button>
  </div>
  <div class="board-list">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnWrite">
        등록
      </button>
    </div>
    <table class="w3-table-all">
      <thead>
        <tr>
          <th>No</th>
          <th>제목</th>
          <th>작성자</th>
          <th>등록일시</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in list" :key="idx">
          <td>{{ row.idx }}</td>
          <td>
            <a v-on:click="fnView(`${row.idx}`)">{{ row.title }}</a>
          </td>
          <td>{{ row.creaNm }}</td>
          <td>{{ row.creaDtm }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination w3-bar w3-padding-16 w3-small" v-show="fnPagingArrowBtn">
      <span class="pg">
        <a href="javascript:;" @click="fnPage(1)" class="first w3-button w3-border">&lt;&lt;</a>
        <a
          href="javascript:;"
          v-if="paging.startPage > 10"
          @click="fnPage(`${paging.startPage - 1}`)"
          class="prev w3-button w3-border"
          >&lt;</a
        >
        <template v-for="(n, index) in paginavigation()">
          <template v-if="paging.page == n">
            <strong class="w3-button w3-border w3-green" :key="index">{{ n }}</strong>
          </template>
          <template v-else>
            <a
              class="w3-button w3-border"
              href="javascript:;"
              @click="fnPage(`${n}`)"
              :key="index"
              >{{ n }}</a
            >
          </template>
        </template>
        <a
          href="javascript:;"
          v-if="paging.totalPageCnt > paging.endPage"
          @click="fnPage(`${paging.endPage + 1}`)"
          class="next w3-button w3-border"
          >&gt;</a
        >
        <a
          href="javascript:;"
          @click="fnPage(`${paging.totalPageCnt}`)"
          class="last w3-button w3-border"
          >&gt;&gt;</a
        >
      </span>
    </div>
  </div>
  <p />
  <div>
    <input type="button" value="이전" class="w3-button w3-round w3-blue-gray" /> 현재
    {{ curpage }} 페이지 / 전체 {{ totalpage }} 전체페이지
    <input type="button" value="다음" class="w3-button w3-round w3-blue-gray" />
  </div>
</template>

<script>
export default {
  data() {
    //변수생성
    return {
      requestBody: {}, //리스트 페이지 데이터전송
      list: {}, //리스트 데이터
      no: '', //게시판 숫자처리
      paging: {}, //페이징 데이터
      page: this.$route.query.page ? this.$route.query.page : 1,
      size: this.$route.query.size ? this.$route.query.size : 10,
      keyword: this.$route.query.keyword,
      type: this.$route.query.type,
      paginavigation: function () {
        //페이징 처리 for문 커스텀
        let pageNumber = []
        let start_page = this.paging.startPage
        let end_page = this.paging.endPage
        for (let i = start_page; i <= end_page; i++) pageNumber.push(i)
        return pageNumber
      },
      searchIndex: '',
      searchText: '',
    }
  },
  mounted() {
    this.fnGetList()
  },
  methods: {
    fnGetList() {
      //데이터 전송용 파라메터 지정
      this.requestBody = {
        searchIndex: this.searchIndex,
        searchText: this.searchText,
        page: this.page,
        size: this.size
      }

      this.$axios
        .get(this.$serverUrl + '/board/api/list', {
          params: this.requestBody,
          headers: {}
        })
        .then((res) => {
          //
          console.log(res)
          this.list = res.data.list
          this.paging = res.data.paging
        })
        .catch((err) => {
          //alert("서버 오류 재시도 해주세요");
          this.list = [
            {
              idx: 1,
              title: '제목1',
              creaNm: '작성자1',
              creaDtm: '작성일시1'
            }
          ]
        })
    },
    fnView(idx) {
      this.requestBody.idx = idx
      this.$router.push({
        path: './detail',
        query: this.requestBody
      })
    },
    fnWrite() {
      this.$router.push({
        path: './write'
      })
    },
    fnPage(n) {
      if (this.page !== n) {
        this.page = n
        this.fnGetList()
      }
    },
    fnPagingArrowBtn() {
      if(paging.totalListCnt > 0){
        return true
      }
    },
    fnSearch() {
      const reg = /^[0-9]*$/  // 숫자만
      if(this.searchIndex == ''){
        alert("검색 색인을 선택해주세요.")
      }else if(this.searchIndex == 'idx' && !reg.test(this.searchText)){
        alert("글번호 검색은 숫자만 입력하세요.")
      }else{
        this.requestBody = {
          searchIndex: this.searchIndex,
          searchText: this.searchText,
          size: this.size,
          page: this.page
        }

      this.$axios.get(this.$serverUrl + '/board/api/list', {
          params: this.requestBody,
          headers: {}
        })
        .then((res) => {
          console.log(res)
          this.list = res.data.list
          this.paging = res.data.paging
        })
        .catch((err) => {
          console.log("에러 : " + err)
        })
      }
    }
  }
}
</script>
