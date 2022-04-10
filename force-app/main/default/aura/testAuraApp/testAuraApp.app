<aura:application extends="force:slds">
    <aura:handler value="{!this}" name="init" action="{!c.init}"/>
    <h1 class='first-h1'>Welcome to Event Communication Via Bubbling</h1>
    <c:bubbleThree/>
    <h1 class='first-h1'>Welcome to Event Communication</h1>
    
    <lightning:card class="component-card" variant="Narrow"  title="Component Event" iconName="custom:custom4">
        <div class="lwc-comp-event">
            <c:grandParentComponent/>
        </div>
    </lightning:card>
    
    <!-- Start of Comment
	<c:testPicklistValues/> 
	End of comment-->
</aura:application>