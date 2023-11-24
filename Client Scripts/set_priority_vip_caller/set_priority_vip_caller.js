function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
       return;
    }
    var caller = g_form.getReference("caller_id", setPriority);  
 }
 
 function setPriority(caller){
     if(caller.vip == 'true'){
         g_form.setValue("impact", "2");
         g_form.setValue("urgency", "1");
         g_form.setReadOnly("impact", true);
         g_form.setReadOnly("urgency", true);
     }else{
         g_form.setReadOnly("impact", false);
         g_form.setReadOnly("urgency", false);
         g_form.addInfoMessage("Now the caller is Non-VIP, please check the Impact and Urgency before submitting.");
     }
 }