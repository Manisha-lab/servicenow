(function runAction( /*GlideRecord*/ current, /*GlideRecord*/ event, /*EmailWrapper*/ email, /*ScopedEmailLogger*/ logger, /*EmailClassifier*/ classifier) {

    var email_log = new GlideRecord('sys_email');
    email_log.addQuery('uid', email.uid);
    email_log.query();
    if (email_log.next()) {
        var attachLogMail = new GlideRecord('sys_email_attachment');
        attachLogMail.addQuery("email", email_log.sys_id);
        attachLogMail.query();
        while (attachLogMail.next()) {
            var file_name = attachLogMail.getValue('file_name');
            var ext = file_name.split('.');
			ext = ext[ext.length -1];
            if (ext == 'xlsx' || ext == 'xls') {
                var attachLog = new GlideRecord('sys_attachment');
                attachLog.addQuery('sys_id', attachLogMail.attachment);
                attachLog.query();
                while (attachLog.next()) {
                    var parser = new sn_impex.GlideExcelParser();
                    var attachment = new GlideSysAttachment()
                    var attachmentStream = attachment.getContentStream(attachLog.sys_id);
                    parser.parse(attachmentStream);
                    //retrieve the column headers
                    var headers = parser.getColumnHeaders();
                    var short_description = headers[0];
                    var description = headers[1];

                    while (parser.next()) {
                        var row = parser.getRow();
                        var incGr = new GlideRecord("incident");
                        incGr.initialize();
                        incGr.short_description = row[short_description];
                        incGr.description = row[description];
                        incGr.insert();
                    }

                }
            } else {
                gs.info("Not a supported file type.");
            }
        }
    } else {
        gs.info("Email not found.");
    }

})(current, event, email, logger, classifier);