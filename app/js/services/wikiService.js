'use strict';

myApp.factory('wiki', function(user) {

    // Markdown parser
    marked.setOptions({
/*
        highlight: function (code, lang, callback) {
            pygmentize({ lang: lang, format: 'html' }, code, function (err, result) {
                if (err) return callback(err);
                callback(null, result.toString());
            });
        },
        highlight: function (code, lang) {
            return hljs.highlight(lang, code).value;
        },
 */
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
        langPrefix: 'lang-'
    });
/*
    var text = '#Markdown\n\nI am using __markdown__.\n\n[Link Title](Link text)\n\n[http link](http://google.com)';
    var mText = marked(text);
    console.log(mText);
    //var re = /(<a href=")(?![http]).*(">)(.*)(<\/a>)/i;
    var   re = /(<a href="http.*")(>)/i;
    console.log(mText.match(re));
    console.log(mText.replace(re, '$1 target="_blank"$2'));
    //console.log(mText.replace(re, '$1javascript:navTo(\'$3\')$2$3$4'));
*/
    function fixTables(parsed) {
        if(user.settings().fancyTables == true) {
            var re = /(<table)(>)/i;
            parsed = parsed.replace(re, '$1 class="table table-striped"$2');
        }
        return parsed;
    }


    return {
        markdown: {
            parse: function(wikiContent) {
                var parsed = marked(wikiContent);
                // fix links
                var  re = /(<a href=")(?![http]).*(">)(.*)(<\/a>)/i;
                parsed = parsed.replace(re, '$1javascript:navTo(\'$3\')$2$3$4');
                var reExternal = /(<a href="http.*")(>)/i;
                parsed = parsed.replace(reExternal, '$1 target="_blank"$2');
                parsed = fixTables(parsed);
                return(parsed);
            }
        },
        dummy_to_protect_commas: 0
    }
});
