$(document).ready(function () {
    // Add/Remove tag rows
    $('#add-tag').click(function (e) {
        e.preventDefault();
        let newRow = $('.tag-row:first').clone();
        newRow.find('input').val('');
        $('#tag-rows').append(newRow);
    });

    $('#tag-rows').on('click', '.remove-tag', function (e) {
        e.preventDefault();
        if ($('.tag-row').length > 1) {
            $(this).closest('.tag-row').remove();
        }
    });

    // Form submission and validation
    $('#meta-form').submit(function (e) {
        e.preventDefault();

        // Check for empty and duplicate keys
        let hasEmptyInputs = false;
        let keys = [];
        let hasDuplicateKeys = false;

        $('.tag-row').each(function () {
            let key = $(this).find('input[name="key[]"]').val();
            let value = $(this).find('input[name="value[]"]').val();

            if (!key || !value) {
                hasEmptyInputs = true;
                return false;
            }

            if (keys.includes(key)) {
                hasDuplicateKeys = true;
                return false;
            }
            keys.push(key);
        });

        if (hasEmptyInputs) {
            alert('Please fill in all key and value fields.');
            return;
        }

        if (hasDuplicateKeys) {
            alert('Duplicate keys are not allowed. Please enter unique keys.');
            return;
        }

        // Generate meta tags
        const PREFIX = 'ceros_';
        let metaTags = '';
        $('.tag-row').each(function () {
            let key = $(this).find('input[name="key[]"]').val();
            let value = $(this).find('input[name="value[]"]').val();

            if (key && value) {
                metaTags += `<meta name="${PREFIX}${key}" content="${value}" />\n`;
            }
        });

        $('#meta-tags').text(metaTags);
        $('#form-container').hide();
        $('#results-container').show();
    });

    // Copy and start over
    $('#copy-button').click(function () {
        navigator.clipboard.writeText($('#meta-tags').text());
        alert('Meta tags copied to clipboard!');
    });

    $('#start-over').click(function () {
        $('#results-container').hide();
        $('#form-container').show();
        $('#meta-form')[0].reset();
    });
});
