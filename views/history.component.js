var history = Vue.createApp({
    data() {
        return {
            tickets: []
        }
    },
    computed:{
        grouped_tickets() {
            gt = [];
            this.tickets_2
            const chunkSize = 3;
            for (let i = 0; i < this.tickets.length; i += chunkSize) {
                const chunk = this.tickets.slice(i, i + chunkSize);
                gt.push(chunk);
            }
            return gt;
        },
        getCookie(cname) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for(let i = 0; i <ca.length; i++) {
              let c = ca[i];
              while (c.charAt(0) == ' ') {
                c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
              }
            }
            return "";
          },

        tickets_2(){
            var t_data
            var url =  window.location.origin + '/tickets/history/' + this.getCookie(user_id)
            console.log(url)
            fetch(url)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => t_data = data).then(data => this.tickets = data.data).then(data => console.log(t_data.data))

            return t_data
        }
    }
})