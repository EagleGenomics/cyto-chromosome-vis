
(function(cyto_chr, d3) {

  var Highlight = function(closecb) {
    this._brush = d3.svg.brush();
    this.dispatch = d3.dispatch('change', 'changeend', 'highlightdelete');
    this._colour = 'steelblue';
    this._opacity = '0.5';
    this._x = 0;
    this._y = 0;
    this._extent = [0,0];
    this._height = 0;
    this._closecb = closecb;
  };

  Highlight.prototype.test = function(e) {
    var self = this;
    return cyto_chr.InitGetterSetter.call(this, "_test", e, function(){
      self._another = "_that";
    });
  };

  Highlight.prototype.extent = function (a) {
    var self = this;
    if(typeof a === "undefined") {
      return self._brush.extent();
    }

    return cyto_chr.InitGetterSetter.call(this, "_extent", a, function(){
      self._brush.extent(a);
    });

  };

  Highlight.prototype.xscale = function(a) {
    var self = this;
    return cyto_chr.InitGetterSetter.call(this, "_xscale", a, function(){
      self._brush.x(a);
    });
  };

  Highlight.prototype.target = function(a) {
    return cyto_chr.InitGetterSetter.call(this, '_target', a);
  };

  Highlight.prototype.height = function(a) {
    return cyto_chr.InitGetterSetter.call(this, '_height', a);
  };

  Highlight.prototype.colour = function(a) {
    return cyto_chr.InitGetterSetter.call(this, '_colour', a);
  };

  Highlight.prototype.opacity = function(a) {
    return cyto_chr.InitGetterSetter.call(this, '_opacity', a);
  };

  Highlight.prototype.x = function(a) {
    return cyto_chr.InitGetterSetter.call(this, '_x', a);
  };

  Highlight.prototype.y = function(a) {
    return cyto_chr.InitGetterSetter.call(this, '_y', a);
  };

  Highlight.prototype.render = function() {
    var self = this;

    this.highlight = this._target.append('g')
      .attr('transform', 'translate(' + this._x + ',' + this._y + ')')
      .call(this._brush);

    this.highlight.selectAll('rect')
      .attr('height', this._height);

    this.highlight.select('.background').remove();

    var e = this.highlight.select('.extent')
      .style('fill', this._colour)
      .style('opacity', this._opacity);

    var cbg_xpos = this._xscale(this._extent[1]) + cyto_chr.margin.left;
    var cbg_ypos = cyto_chr.margin.top - 3;
    var cbg = this._target.append('g');
    cbg.append('title').text('remove');

    this._brush.on('brush', function() {
      self.updateXButton();
      var ext = self._brush.extent();
      self.dispatch.change(ext);
    });

    this._brush.on('brushend', function(d) {
      var ext = self._brush.extent();
      self.dispatch.changeend(ext);
    });
    return this;
  };

  Highlight.prototype.remove = function() {
    this.highlight.remove();
    this._closecb(this);
    return this;
  };

  Highlight.prototype.updateXButton = function() {
    var e = this._brush.extent();
    var new_xpos = this._xscale(e[1]) + cyto_chr.margin.left;
  };

  Highlight.prototype.move = function(start, stop) {
    this._brush.extent([start, stop]);
    this.highlight.call(this._brush);
    this.updateXButton();
  };

  cyto_chr.highlight = function(cb){
    return new Highlight(cb);
  };

})(cyto_chr || {}, d3);