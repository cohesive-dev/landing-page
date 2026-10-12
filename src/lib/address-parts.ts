// Turn a Google Places (New) addressComponents list into the form's street / city / state / ZIP.
export type AddressComponent = { longText?: string; shortText?: string; types?: string[] };
export type AddressParts = { street: string; city: string; state: string; zip: string };

export function addressParts(components: AddressComponent[] | undefined): AddressParts {
  const find = (type: string) => (components ?? []).find((c) => c.types?.includes(type));
  const number = find("street_number")?.longText ?? "";
  const route = find("route")?.shortText ?? find("route")?.longText ?? "";
  const city =
    find("locality")?.longText ??
    find("sublocality_level_1")?.longText ??
    find("sublocality")?.longText ??
    find("postal_town")?.longText ??
    find("administrative_area_level_3")?.longText ??
    "";
  return {
    street: [number, route].filter(Boolean).join(" "),
    city,
    state: find("administrative_area_level_1")?.shortText ?? "",
    zip: find("postal_code")?.longText ?? "",
  };
}
