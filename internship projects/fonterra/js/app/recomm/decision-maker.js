/**
 * Created by fify on 15-3-29.
 */
define(['jquery'], function ($) {
    function filter(features, products) {
        var result = [];
        $.each(products, function (index, product) {
            if (checkFilter(features, product)) {
                result.push(product);
            }
        });

        return result;
    }

    function checkFilter(features, product) {
        /**
         * 1. Exclusive selection method is the logic base (except purple area) for selecting the proper ingredients
         * from data base, e.g. only the ingredients contenting all the chosen criteria will be shown in “result sheet”
         * (in section 1 of recommendation page).
         *
         * 2. If criteria/criterion in “green” are/is selected and the corresponding ingredient fulfils all the selected
         * requirements and is recognized as a result then this ingredient should be highlighted as preferred among
         * other resulted ingredients (if there is any). There are “dark green” and “light green”, “dark green” is
         * prioritized than “light green”, should be recommended first. Backstage calculation is required when multiple
         * green items (for two ingredients, e.g. column Q & R “WPI 895” & “WPC322”) are co-selected at the same time,
         * the programme should be able to calculate which one should be ranked higher than the other based on: 1)
         * Differentiating “dark green” and “light green”; 2) The number of greened items had been chosen.
         *
         * 3. Criteria/criterion in “red” and Criteria/criterion in “blue” cannot be co-selected, if they are
         * co-selected then the corresponded ingredient will be not shown as a result (column N, MPC4862).
         *
         * 4. The “yellowed/blue” items in “data base” bind with “yellowed/blue” items in “market proposition” section;
         * (e.g. MPC4861/4761, MPC4766, and MPC4862). The “greyed”  items in “data base” bind with “greyed” items in
         * “market proposition” section; (e.g. MPC4861/4761, MPC4766 and MPC4862). The relationship between
         * “yellow/blue” and grey are “alternative” (“either this or that” kind of relationship)
         * e.g.: When MPC4861/4761 is pointed as “result”,  then if any yellowed item in “data base” is selected,
         * yellowed item in  “market proposition” should be shown against/rather than the “greyed item in  “market
         * proposition”
         *
         * 5. Items in section 8 (purple) follow a different logic than the others, this section can do multiple
         * choices, the corresponded points in “data base” are shown in purple. If any item in the purple area in the
         * data based can match with one of the selected criteria under section 8 in “selection chart”, then the
         * corresponded powder will be considered as a result (of course, the premise is that the certain powder should
         * fulfil all the other selected criteria first.). e.g. if I chose SMP and WMP together, then both SMP and WMP
         * (in the purple area in “data base”) correspond powders (which match with other selected criteria) should be
         * all shown as results, this is different logic, if follow the general selection logic (exclusive logic), then
         * the result will be null, as none of the powder contains both “SMP” & “WMP” together. (Do not put a “not sure”
         * option under this section).
         */
        // Check the 1st condition.
        var match = true;
        $.each(features, function (index, feature) {
            // Purple features are just labels. We skip the labels and check later.
            if (feature.color === 'PURPLE') {
                return true;
            }
            var featureId = feature.featureId;

            if (feature.selected && product.features[featureId] === undefined) {
                // The required feature is not satisfied.
                match = false;
                return false;
            }
        });
        if (!match) {
            return false;
        }

        // 2nd condition is used for sorting.

        // Check the 3rd condition.
        if (product.selectionColor.RED && product.selectionColor.BLUE) {
            return false;
        }

        // 4th condition will be handled by the selection phase.

        // Check the 5th condition.
        match = true;
        $.each(features, function (index, feature) {
            if (feature.color !== 'PURPLE') {
                // Skip non-label features.
                return true;
            }

            var featureId = feature.featureId;
            if (feature.selected) {
                if (product.features[featureId]) {
                    match = true;
                    return false;
                    // At least one of them matches, no need to check further.
                } else {
                    match = false;
                }
            }
        });
        return match;
    }

    function sort(features, products) {
        // The products should have contained the color information.
        products.sort(function (a, b) {
            // 用来单独处理Greek Yoghurt的Product 10。
            if (a.selectionColor.RED_ON_GREEN) {
                return -1;
            } else if (b.selectionColor.RED_ON_GREEN) {
                return 1;
            }

            if (a.selectionColor.DARK_GREEN > b.selectionColor.DARK_GREEN) {
                return -1;
            } else if (a.selectionColor.DARK_GREEN === b.selectionColor.DARK_GREEN
                && a.selectionColor.GREEN > b.selectionColor.GREEN) {
                return -1;
            } else if (a.selectionColor.DARK_GREEN === b.selectionColor.DARK_GREEN
                && a.selectionColor.GREEN === b.selectionColor.GREEN
                && a.selectionColor.NORMAL > b.selectionColor.NORMAL) {
                return -1;
            } else if (a.selectionColor.DARK_GREEN === b.selectionColor.DARK_GREEN
                && a.selectionColor.GREEN === b.selectionColor.GREEN
                && a.selectionColor.NORMAL === b.selectionColor.NORMAL) {
                return 0;
            } else {
                return 1;
            }
        });

        return products;
    }

    function addProposition(features, products) {
        $.each(products, function (index, product) {
            makeDisplayProposition(features, product);
        });

        return products;
    }

    function makeDisplayProposition(features, product) {
        product.displayPropositions = [];
        $.each(product.propositions, function (index, proposition) {
            if (proposition.color === 'NORMAL') {
                product.displayPropositions.push(proposition);
            } else if (proposition.color === 'YELLOW' && product.selectionColor.YELLOW > 0) {
                product.displayPropositions.push(proposition);
            } else if (proposition.color === 'GRAY' && product.selectionColor.GRAY > 0) {
                product.displayPropositions.push(proposition);
            } else if (proposition.color === 'BLUE' && product.selectionColor.BLUE > 0) {
                product.displayPropositions.push(proposition);
            }
        });
    }

    function markColor(features, product) {
        product.selectionColor = {
            NORMAL: 0, GREEN: 0, DARK_GREEN: 0, YELLOW: 0, GRAY: 0, BLUE: 0, RED: 0, PURPLE: 0, RED_ON_GREEN: 0
        };

        // 用来单独处理Greek Yoghurt的Product 10。
        if (product.yoghurtType === 'HIGH_PROTEIN' && product.productId === 10) {
            var upSelected = product.features['3'].selected || product.features['4'] || product.features['5'];
            var downSelected = product.features['20'].selected;
            product.selectionColor.RED_ON_GREEN = upSelected && downSelected ? 1 : 0;
        }

        $.each(features, function (index, feature) {
            if (!feature.selected) {
                return true;
            }
            var featureId = feature.featureId;
            if (product.features[featureId]) {
                product.selectionColor[product.features[featureId].color]++;
            }
        });
    }

    function preProcess(features, products) {
        $.each(products, function (index, product) {
            markColor(features, product);
        });
        return products;
    }

    function makeDecision(features, productList) {
        var products = productList.slice(0);
        products = preProcess(features, products);
        products = filter(features, products);
        products = sort(features, products);
        products = addProposition(features, products);

        return products;
    }

    return {
        makeDecision: makeDecision
    }
});
