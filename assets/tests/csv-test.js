var expect = chai.expect;

describe("Distancia", function() {

  describe("Calculate", function() {
    it("Debería aceptar una cadena literal en formato CSV que represente una tabla", function() {
      var original = 'a,b,c,d\nw,x,y,z';
      var result = calculate(original);
      expect(result).to.be.instanceof(Array);
      expect(result[0].value.toString()).to.equal("a,b,c,d");
      expect(result[1].value.toString()).to.equal("w,x,y,z");
    });

    it("Debería aceptar una cadena literal en formato CSV que represente una tabla con errores", function() {
      var original = 'a,b,c,d\nx,y,z';
      var result = calculate(original);
      expect(result).to.be.instanceof(Array);
      expect(result[0].rowClass).to.equal("first");
      expect(result[1].rowClass).to.equal("error");
    });

    it("Debería aceptar una cadena literal en formato CSV que represente una tabla con un elemento entre comillas", function() {
      var original = 'a,b,c,"d,e,f"\nx,y,z';
      var result = calculate(original);
      expect(result[0].value.toString()).to.equal("a,b,c,d,e,f");
    });

    it("Debería aceptar una cadena literal en formato CSV que represente una tabla con espacios al principio", function() {
      var original = '     a,b,c,"d,e,f"\nx,y,z';
      var result = calculate(original);
      expect(result[0].value.toString()).to.equal("a,b,c,d,e,f");
    });

    it("Debería aceptar una cadena literal en formato CSV que represente una tabla con espacios al final", function() {
      var original = 'a,b,c,"d,e,f"       \nx,y,z';
      var result = calculate(original);
      expect(result[0].value.toString()).to.equal("a,b,c,d,e,f");
    });

    it("Debería aceptar una cadena literal en formato CSV que represente una tabla con saltos de línea al principio", function() {
      var original = '\n\na,b,c,"d,e,f"\nx,y,z';
      var result = calculate(original);
      expect(result[0].rowClass).to.equal("first");
      expect(result[0].value.toString()).to.equal("a,b,c,d,e,f");
    });

    it("Debería aceptar una cadena literal en formato CSV que represente una tabla con saltos de línea al final", function() {
      var original = 'a,b,c,"d,e,f"\nx,y,z\n\n';
      var result = calculate(original);
      expect(result.length).to.equal(2);
    });
  });
});
