module.exports = {
  document: {
    convert: {
      type: 'document.convert',
      preempts: 3,
      priority: {
        html: 1,
        pdf: 3
      },
      delay: {
        html: 1000,
        pdf: 100000
      }
    }
  }
}
