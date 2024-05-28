<template>
    <div class="gitalk-container">
      <div id="gitalk-container"></div>
    </div>
</template>
<script>
import md5 from "md5"
import Gitalk from "gitalk"
import "gitalk/dist/gitalk.css"
export default {
  name: "gitalk",
  data() {
    return {}
  },
  mounted() {
    const commentConfig = {
      clientID: "Ov23liD0UhqemUuxieyV",
      clientSecret: "3bb44dbe37c13da4a5f41e636b73adc2a8e616ba",
      repo: "anxinJ.github.io",
      owner: "anxinJ",
      admin: ["anxinJ"],
      id: md5(location.pathname),
      distractionFreeMode: false,
    }
    const gitalk = new Gitalk(commentConfig)
    gitalk.render("gitalk-container")
  },
}
</script>
<style>
.gt-container .gt-header-textarea {
  color: #000;
}
</style>