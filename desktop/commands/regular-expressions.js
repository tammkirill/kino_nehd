class DesktopRegExp {
  get filmNumber() {
    return /^\d+\/$/;
  }

  get linkAfisha() {
    return /^(city)\/\d+\/$|^\s*$/;
  }

  get filmPoster() {
    return /^\d{1,5}x\d{1,5}$/;
  }

  get filmAfishTic() {
    return /^\d+\/afisha\/city\/\d+\/(day_view\/\d{4}-\d{2}-\d{2}\/){0,1}$/;
  }

  get filmOrSeriesNumber() {
    return /^(film|series)\/\d+\/$/;
  }
}

module.exports = new DesktopRegExp();