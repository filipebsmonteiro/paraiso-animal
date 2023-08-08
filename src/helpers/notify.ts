export default {
  install(app) {
    let wrapper: HTMLElement | null = null;

    const init = () => {
      const wrapperNode = document.createElement(`div`)
      wrapperNode.classList.add(`toast`)
      wrapperNode.classList.add(`toast-center`)
      wrapperNode.classList.add(`toast-middle`)
      wrapper = wrapperNode
      document.body.append(wrapperNode)
    }

    const notify = (node: HTMLElement, timeout: number = 3000) => {
      wrapper?.append(node)
      setTimeout(() => {
        node.style.opacity = `0`;
        setTimeout(() => wrapper?.remove(), 1000);
      }, timeout);
    }

    const createNotification = (message: string): HTMLElement => {
      const notification = document.createElement(`div`)
      notification.textContent = message
      notification.classList.add(`alert`)
      notification.classList.add(`text-white`)
      notification.classList.add(`flex`)
      notification.classList.add(`justify-center`)
      notification.classList.add(`mx-6`)
      notification.style.transition = "opacity 1.0s linear 0s";
      return notification
    }

    const success = (message: string) => {
      init()
      const notification = createNotification(message)
      notification.classList.add(`alert-success`)
      notify(notification)
    }

    // app.config.globalProperties.$notify = (message: string, options) => {
    app.config.globalProperties.$notify =  {
      // if (options.type === `success`) {
      //   success(message)
      // }

      success
    }
  }
}