## **Description**

Express server used to access the LeadConduit API for the Getting Started Guide and TrustedForm Resubmission Tool.

## **URL**
http://leadconduit-node-server.herokuapp.com

## **/test-tool**

**About**: Get field data from a flow.

**Method**: POST

**Required Fields**:

* **flow_id**: The Posting URL for the flow you want to test.
* **api_key**: The API Key associated with the account that owns the flow.

**Returns**: JSON object

* **example** { "First Name": "first_name"}


## **/flow-name**

**About**: Get the name of the flow.

**Method**: POST

**Required Fields**:

* **flow_id**: The Posting URL for the flow you want to test.
* **api_key**: The API Key associated with the account that owns the flow.

**Returns**: String

* **example** "Flow Name"


## **/trusted-form-errors**

**About**: Finds all TrustedForm certificate claim errors in an account in the last 3 days and resubmits those certificates via the TrustedForm API.

**Method**: POST

**Required Fields**:

* **api_key**: The API Key associated with the account that owns the flow.

**Returns**: JSON object

* **example**
[ { { "outcome": "success", "lead": "id": "8249842432907402378023" } }, { { "outcome": "success", "lead": "id": "8249842432907402378023" } } ]