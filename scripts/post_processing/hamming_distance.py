def hamming_distance(str1, str2, max_length):
    return sum(c1 != c2 for c1, c2 in zip(str1.ljust(max_length, '0'), str2.ljust(max_length, '0')))

def compare_precincts(district_plan1, district_plan2):
    precincts1 = district_plan1["features"][0]["properties"]["PRECINCTS"].split(',')
    precincts2 = district_plan2["features"][0]["properties"]["PRECINCTS"].split(',')

    # Find the maximum length of precincts
    max_length = max(len(precincts1), len(precincts2))

    # Calculate Hamming distance
    hamming_dist = hamming_distance(''.join(precincts1), ''.join(precincts2), max_length)

    return hamming_dist