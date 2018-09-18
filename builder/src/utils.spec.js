import { normalizeName, denormalizeList } from "./utils";

describe("Utilities Functions Test", () => {
  it("Tests normalizeName() function", () => {
    expect(normalizeName("")).toEqual("");
    expect(normalizeName("one")).toEqual("One");
    expect(normalizeName("one.two.three")).toEqual("Three");
    expect(normalizeName("one..two..three")).toEqual("Three");
    expect(normalizeName("one.two.three_point_one-1")).toEqual(
      "Three point one"
    );
  });

  it("Tests denormalizeList() function", () => {
    expect(denormalizeList([])).toEqual({});
    expect(
      denormalizeList([["one.two.three", 3], ["one.two.four", 4]])
    ).toEqual({
      one: { two: { three: 3, four: 4 } }
    });
    expect(denormalizeList([["four-[0]", 5], ["four-[1]", 2]])).toEqual({
      four: [5, 2]
    });
    expect(denormalizeList([["one.four-[0]", 5], ["one.four-[1]", 2]])).toEqual(
      {
        one: {
          four: [5, 2]
        }
      }
    );
    expect(
      denormalizeList([["one.four-[0].three", 5], ["one.four-[1]", 2]])
    ).toEqual({
      one: {
        four: [{ three: 5 }, 2]
      }
    });
    expect(
      denormalizeList([
        ["clients-[0].name", "Kostas"],
        ["clients-[0].surname", "Pelelis"],
        ["clients-[1].name", "Giannis"],
        ["clients-[1].surname", "Pelelis"]
      ])
    ).toEqual({
      clients: [
        {
          name: "Kostas",
          surname: "Pelelis"
        },
        {
          name: "Giannis",
          surname: "Pelelis"
        }
      ]
    });
  });
});
