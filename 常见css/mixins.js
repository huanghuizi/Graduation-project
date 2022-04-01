export const mixins = {
  data() {
    return {}
  },
  computed: {},
  methods: {
     /**
     * 管理端统一路由
     * @param destination {string} 目的地路由名称
     * @param params {Object} 路由携带的query
     */
      routerLink(destination, params = {}) {
        if (typeof params !== 'object') throw new Error('params should be an object')
        let routerObj = routerDictionary[destination]
        if (!routerObj) throw new Error('路由信息不存在')
        if (destination === this.$route.name) return
        this.ADD_TABS_VIEW(routerObj)
        this.$router.replace({
          path: `/${destination}`,
          query: params
        })
      },
  }
 
},